'use server';

import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

// Get document editors based on file_id
export async function getDocumentEditors({ fileId }: { fileId: string }): Promise<{
  records: {
    legal_entity: {
      organization: {
        organization_user: {
          user_id: string;
          permissions: string;
        }[];
      };
    };
  }[];
}> {
  const supabase = createClient();

  // Get documents with file_id and their owner (legal_entity)
  const { data: documents, error: docsError } = await supabase
    .from('document')
    .select('owner_id')
    .eq('file_id', fileId);

  if (docsError) throw docsError;
  if (!documents || documents.length === 0) {
    return { records: [] };
  }

  // Get unique legal entity IDs
  const entityIds = [...new Set(documents.map((doc: any) => doc.owner_id).filter(Boolean))];

  if (entityIds.length === 0) {
    return { records: [] };
  }

  // Get legal entities with their organization_id
  const { data: entities, error: entitiesError } = await supabase
    .from('legal_entity')
    .select('id, organization_id')
    .in('id', entityIds);

  if (entitiesError) throw entitiesError;
  if (!entities || entities.length === 0) {
    return { records: [] };
  }

  // Get organization IDs
  const organizationIds = [...new Set(entities.map((e: any) => e.organization_id).filter(Boolean))];

  if (organizationIds.length === 0) {
    return { records: [] };
  }

  // Get organization users for these organizations
  const { data: orgUsers, error: usersError } = await supabase
    .from('organization_user')
    .select('user_id, permissions, organization_id')
    .in('organization_id', organizationIds);

  if (usersError) throw usersError;

  // Build the response structure to match GraphQL
  // Group by document's legal_entity
  const records = documents.map((doc: any) => {
    const entity = entities.find((e: any) => e.id === doc.owner_id);
    if (!entity) {
      return {
        legal_entity: {
          organization: {
            organization_user: []
          }
        }
      };
    }

    const usersForOrg = (orgUsers || []).filter(
      (ou: any) => ou.organization_id === entity.organization_id
    );

    return {
      legal_entity: {
        organization: {
          organization_user: usersForOrg.map((ou: any) => ({
            user_id: ou.user_id,
            permissions: ou.permissions
          }))
        }
      }
    };
  });

  return { records };
}

// Add offering document
export async function addOfferingDocument({
  offeringId,
  entityId,
  offeringUniqueId,
  title,
  fileId,
  docUrl,
  docType,
  format
}: {
  offeringId: string;
  entityId: string;
  offeringUniqueId: string;
  title: string;
  fileId: string;
  docUrl: string;
  docType: string;
  format: string;
}): Promise<{
  documentResult: {
    affectedCount: number;
    records: {
      id: string;
      title: string;
      file_id: string;
      date: string | null;
      format: string;
      type: string;
      text: string | null;
      url: string | null;
      thumbnail_image_id: string | null;
      owner_id: string;
      access: string | null;
      offering_id: string;
      offering_unique_id: string;
    }[];
  };
  offeringResult: {
    affectedCount: number;
    records: {
      id: string;
      updated_at: string;
    }[];
  };
}> {
  const supabase = createClient();

  // Insert document
  const {
    data: docData,
    error: docError,
    count: docCount
  } = await supabase
    .from('document')
    .insert(
      {
        title,
        url: docUrl,
        file_id: fileId,
        type: docType,
        format,
        offering_id: offeringId,
        owner_id: entityId,
        offering_unique_id: offeringUniqueId
      },
      { count: 'exact' }
    )
    .select(
      'id, title, file_id, date, format, type, text, url, thumbnail_image_id, owner_id, access, offering_id, offering_unique_id'
    );

  if (docError) throw docError;

  // Update offering's updated_at timestamp
  const {
    data: offeringData,
    error: offeringError,
    count: offeringCount
  } = await supabase
    .from('offering')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', offeringId)
    .select('id, updated_at');

  if (offeringError) throw offeringError;

  revalidatePath('/', 'page');

  return {
    documentResult: {
      affectedCount: typeof docCount === 'number' ? docCount : (docData?.length ?? 0),
      records: (docData ?? []) as any
    },
    offeringResult: {
      affectedCount:
        typeof offeringCount === 'number' ? offeringCount : (offeringData?.length ?? 0),
      records: (offeringData ?? []) as any
    }
  };
}

// Remove offering document
export async function removeOfferingDocument({
  offeringId,
  documentId
}: {
  offeringId: string;
  documentId: string;
}): Promise<{
  offeringResult: {
    affectedCount: number;
    records: {
      id: string;
      updated_at: string;
    }[];
  };
  documentResult: {
    affectedCount: number;
  };
}> {
  const supabase = createClient();

  // Update offering's updated_at timestamp first
  const {
    data: offeringData,
    error: offeringError,
    count: offeringCount
  } = await supabase
    .from('offering')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', offeringId)
    .select('id, updated_at');

  if (offeringError) throw offeringError;

  // Delete document
  const { error: docError, count: docCount } = await supabase
    .from('document')
    .delete()
    .in('id', [documentId]);

  if (docError) throw docError;

  revalidatePath('/', 'page');

  return {
    offeringResult: {
      affectedCount:
        typeof offeringCount === 'number' ? offeringCount : (offeringData?.length ?? 0),
      records: (offeringData ?? []) as any
    },
    documentResult: {
      affectedCount: typeof docCount === 'number' ? docCount : 0
    }
  };
}
