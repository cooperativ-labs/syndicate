export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      address: {
        Row: {
          city: string | null
          country: string
          created_at: string | null
          id: string
          label: string | null
          lat: number | null
          legal_entity_id: number
          line1: string | null
          line2: string | null
          line3: string | null
          lng: number | null
          postal_code: string | null
          state_province: string | null
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          country: string
          created_at?: string | null
          id?: string
          label?: string | null
          lat?: number | null
          legal_entity_id: number
          line1?: string | null
          line2?: string | null
          line3?: string | null
          lng?: number | null
          postal_code?: string | null
          state_province?: string | null
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          country?: string
          created_at?: string | null
          id?: string
          label?: string | null
          lat?: number | null
          legal_entity_id?: number
          line1?: string | null
          line2?: string | null
          line3?: string | null
          lng?: number | null
          postal_code?: string | null
          state_province?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "address_legal_entity_id_fkey"
            columns: ["legal_entity_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      crypto_address: {
        Row: {
          address: string
          chain_id: number | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          legal_entity_id: number
          name: string | null
          protocol:
            | Database["public"]["Enums"]["crypto_address_protocol"]
            | null
          type: Database["public"]["Enums"]["crypto_address_type"] | null
          updated_at: string | null
        }
        Insert: {
          address: string
          chain_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          legal_entity_id: number
          name?: string | null
          protocol?:
            | Database["public"]["Enums"]["crypto_address_protocol"]
            | null
          type?: Database["public"]["Enums"]["crypto_address_type"] | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          chain_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          legal_entity_id?: number
          name?: string | null
          protocol?:
            | Database["public"]["Enums"]["crypto_address_protocol"]
            | null
          type?: Database["public"]["Enums"]["crypto_address_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crypto_address_legal_entity_id_fkey"
            columns: ["legal_entity_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      document: {
        Row: {
          access: Database["public"]["Enums"]["document_access_type"] | null
          created_at: string | null
          date: string | null
          file_id: string | null
          format: Database["public"]["Enums"]["document_format"] | null
          id: string
          offering_id: number | null
          offering_unique_id: string
          owner_id: number
          smart_contract_id: string | null
          text: string | null
          thumbnail_image: string | null
          title: string | null
          type: Database["public"]["Enums"]["document_type"] | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          access?: Database["public"]["Enums"]["document_access_type"] | null
          created_at?: string | null
          date?: string | null
          file_id?: string | null
          format?: Database["public"]["Enums"]["document_format"] | null
          id?: string
          offering_id?: number | null
          offering_unique_id: string
          owner_id: number
          smart_contract_id?: string | null
          text?: string | null
          thumbnail_image?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["document_type"] | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          access?: Database["public"]["Enums"]["document_access_type"] | null
          created_at?: string | null
          date?: string | null
          file_id?: string | null
          format?: Database["public"]["Enums"]["document_format"] | null
          id?: string
          offering_id?: number | null
          offering_unique_id?: string
          owner_id?: number
          smart_contract_id?: string | null
          text?: string | null
          thumbnail_image?: string | null
          title?: string | null
          type?: Database["public"]["Enums"]["document_type"] | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "offering"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      document_signatory: {
        Row: {
          archived: boolean | null
          created_at: string | null
          date: string | null
          document_id: string
          id: string
          legal_entity_id: number | null
          signature: string | null
          signer_address: string | null
          updated_at: string | null
        }
        Insert: {
          archived?: boolean | null
          created_at?: string | null
          date?: string | null
          document_id: string
          id?: string
          legal_entity_id?: number | null
          signature?: string | null
          signer_address?: string | null
          updated_at?: string | null
        }
        Update: {
          archived?: boolean | null
          created_at?: string | null
          date?: string | null
          document_id?: string
          id?: string
          legal_entity_id?: number | null
          signature?: string | null
          signer_address?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_signatory_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "document"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_signatory_legal_entity_id_fkey"
            columns: ["legal_entity_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      email_address: {
        Row: {
          address: string
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string | null
          organization_id: number
          updated_at: string | null
        }
        Insert: {
          address: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string | null
          organization_id: number
          updated_at?: string | null
        }
        Update: {
          address?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string | null
          organization_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_address_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      investor_application: {
        Row: {
          application_doc_id: string
          created_at: string | null
          id: string
          offering_participant_id: string
          updated_at: string | null
        }
        Insert: {
          application_doc_id: string
          created_at?: string | null
          id?: string
          offering_participant_id: string
          updated_at?: string | null
        }
        Update: {
          application_doc_id?: string
          created_at?: string | null
          id?: string
          offering_participant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investor_application_application_doc_id_fkey"
            columns: ["application_doc_id"]
            isOneToOne: false
            referencedRelation: "document"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_application_offering_participant_id_fkey"
            columns: ["offering_participant_id"]
            isOneToOne: false
            referencedRelation: "offering_participant"
            referencedColumns: ["id"]
          },
        ]
      }
      jurisdiction: {
        Row: {
          country: string
          created_at: string | null
          id: string
          province: string | null
          updated_at: string | null
        }
        Insert: {
          country: string
          created_at?: string | null
          id?: string
          province?: string | null
          updated_at?: string | null
        }
        Update: {
          country?: string
          created_at?: string | null
          id?: string
          province?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      legal_entity: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: number
          jurisdiction_id: string | null
          legal_name: string | null
          operating_currency:
            | Database["public"]["Enums"]["currency_code"]
            | null
          organization_id: number
          purpose: string | null
          tax_id: string | null
          type: Database["public"]["Enums"]["legal_entity_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: never
          jurisdiction_id?: string | null
          legal_name?: string | null
          operating_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null
          organization_id: number
          purpose?: string | null
          tax_id?: string | null
          type: Database["public"]["Enums"]["legal_entity_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: never
          jurisdiction_id?: string | null
          legal_name?: string | null
          operating_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null
          organization_id?: number
          purpose?: string | null
          tax_id?: string | null
          type?: Database["public"]["Enums"]["legal_entity_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_entity_jurisdiction_id_fkey"
            columns: ["jurisdiction_id"]
            isOneToOne: false
            referencedRelation: "jurisdiction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_entity_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_entity_relationship: {
        Row: {
          child_entity_id: number
          created_at: string | null
          id: string
          parent_entity_id: number
          relationship_type: string
        }
        Insert: {
          child_entity_id: number
          created_at?: string | null
          id?: string
          parent_entity_id: number
          relationship_type: string
        }
        Update: {
          child_entity_id?: number
          created_at?: string | null
          id?: string
          parent_entity_id?: number
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "legal_entity_relationship_child_entity_id_fkey"
            columns: ["child_entity_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "legal_entity_relationship_parent_entity_id_fkey"
            columns: ["parent_entity_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      linked_account: {
        Row: {
          account_provided_id: string | null
          created_at: string | null
          hidden: boolean | null
          id: string
          organization_id: number
          type: Database["public"]["Enums"]["linked_account_type"] | null
          updated_at: string | null
          url: string
          username: string | null
          verified: boolean | null
        }
        Insert: {
          account_provided_id?: string | null
          created_at?: string | null
          hidden?: boolean | null
          id?: string
          organization_id: number
          type?: Database["public"]["Enums"]["linked_account_type"] | null
          updated_at?: string | null
          url: string
          username?: string | null
          verified?: boolean | null
        }
        Update: {
          account_provided_id?: string | null
          created_at?: string | null
          hidden?: boolean | null
          id?: string
          organization_id?: number
          type?: Database["public"]["Enums"]["linked_account_type"] | null
          updated_at?: string | null
          url?: string
          username?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "linked_account_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_configuration: {
        Row: {
          created_at: string | null
          id: string
          notification_method: Database["public"]["Enums"]["notification_method"]
          notification_recipient_type: Database["public"]["Enums"]["notification_recipient_type"]
          notification_subject: Database["public"]["Enums"]["notification_subject"]
          organization_user_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          notification_method: Database["public"]["Enums"]["notification_method"]
          notification_recipient_type: Database["public"]["Enums"]["notification_recipient_type"]
          notification_subject: Database["public"]["Enums"]["notification_subject"]
          organization_user_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          notification_method?: Database["public"]["Enums"]["notification_method"]
          notification_recipient_type?: Database["public"]["Enums"]["notification_recipient_type"]
          notification_subject?: Database["public"]["Enums"]["notification_subject"]
          organization_user_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_configuration_organization_user_id_fkey"
            columns: ["organization_user_id"]
            isOneToOne: false
            referencedRelation: "organization_user"
            referencedColumns: ["id"]
          },
        ]
      }
      offering: {
        Row: {
          access_code: string | null
          additional_info: string | null
          admin_expense: number | null
          banner_image: string | null
          brand_color: string | null
          cap_rate: number | null
          coc_return: number | null
          created_at: string | null
          custom_onboarding_link: string | null
          distribution_currency:
            | Database["public"]["Enums"]["currency_code"]
            | null
          distribution_description: string | null
          distribution_frequency: number | null
          distribution_period:
            | Database["public"]["Enums"]["distribution_period_type"]
            | null
          id: number
          image: string | null
          investment_currency:
            | Database["public"]["Enums"]["currency_code"]
            | null
          is_public: boolean | null
          light_brand: boolean | null
          max_investors: number | null
          max_raise: number | null
          max_units_per_investor: number | null
          min_investors: number | null
          min_raise: number | null
          min_units_per_investor: number | null
          name: string
          num_units: number | null
          offering_entity_id: number
          preferred_return: number | null
          price_start: number | null
          primary_video: string | null
          projected_appreciation: number | null
          projected_irr: number | null
          projected_irr_max: number | null
          raise_period: number | null
          raise_start: string | null
          sharing_image: string | null
          short_description: string | null
          stage: Database["public"]["Enums"]["offering_stage"] | null
          target_equity_multiple: number | null
          target_equity_multiple_max: number | null
          type: Database["public"]["Enums"]["offering_type"] | null
          unit_name: Database["public"]["Enums"]["unit_name"] | null
          updated_at: string | null
          waitlist_on: boolean | null
          website: string | null
        }
        Insert: {
          access_code?: string | null
          additional_info?: string | null
          admin_expense?: number | null
          banner_image?: string | null
          brand_color?: string | null
          cap_rate?: number | null
          coc_return?: number | null
          created_at?: string | null
          custom_onboarding_link?: string | null
          distribution_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null
          distribution_description?: string | null
          distribution_frequency?: number | null
          distribution_period?:
            | Database["public"]["Enums"]["distribution_period_type"]
            | null
          id?: never
          image?: string | null
          investment_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null
          is_public?: boolean | null
          light_brand?: boolean | null
          max_investors?: number | null
          max_raise?: number | null
          max_units_per_investor?: number | null
          min_investors?: number | null
          min_raise?: number | null
          min_units_per_investor?: number | null
          name: string
          num_units?: number | null
          offering_entity_id: number
          preferred_return?: number | null
          price_start?: number | null
          primary_video?: string | null
          projected_appreciation?: number | null
          projected_irr?: number | null
          projected_irr_max?: number | null
          raise_period?: number | null
          raise_start?: string | null
          sharing_image?: string | null
          short_description?: string | null
          stage?: Database["public"]["Enums"]["offering_stage"] | null
          target_equity_multiple?: number | null
          target_equity_multiple_max?: number | null
          type?: Database["public"]["Enums"]["offering_type"] | null
          unit_name?: Database["public"]["Enums"]["unit_name"] | null
          updated_at?: string | null
          waitlist_on?: boolean | null
          website?: string | null
        }
        Update: {
          access_code?: string | null
          additional_info?: string | null
          admin_expense?: number | null
          banner_image?: string | null
          brand_color?: string | null
          cap_rate?: number | null
          coc_return?: number | null
          created_at?: string | null
          custom_onboarding_link?: string | null
          distribution_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null
          distribution_description?: string | null
          distribution_frequency?: number | null
          distribution_period?:
            | Database["public"]["Enums"]["distribution_period_type"]
            | null
          id?: never
          image?: string | null
          investment_currency?:
            | Database["public"]["Enums"]["currency_code"]
            | null
          is_public?: boolean | null
          light_brand?: boolean | null
          max_investors?: number | null
          max_raise?: number | null
          max_units_per_investor?: number | null
          min_investors?: number | null
          min_raise?: number | null
          min_units_per_investor?: number | null
          name?: string
          num_units?: number | null
          offering_entity_id?: number
          preferred_return?: number | null
          price_start?: number | null
          primary_video?: string | null
          projected_appreciation?: number | null
          projected_irr?: number | null
          projected_irr_max?: number | null
          raise_period?: number | null
          raise_start?: string | null
          sharing_image?: string | null
          short_description?: string | null
          stage?: Database["public"]["Enums"]["offering_stage"] | null
          target_equity_multiple?: number | null
          target_equity_multiple_max?: number | null
          type?: Database["public"]["Enums"]["offering_type"] | null
          unit_name?: Database["public"]["Enums"]["unit_name"] | null
          updated_at?: string | null
          waitlist_on?: boolean | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offering_offering_entity_id_fkey"
            columns: ["offering_entity_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      offering_description_text: {
        Row: {
          created_at: string | null
          id: string
          offering_id: number
          order: number
          section: Database["public"]["Enums"]["offering_tab_section"]
          text: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          offering_id: number
          order: number
          section: Database["public"]["Enums"]["offering_tab_section"]
          text: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          offering_id?: number
          order?: number
          section?: Database["public"]["Enums"]["offering_tab_section"]
          text?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offering_description_text_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "offering"
            referencedColumns: ["id"]
          },
        ]
      }
      offering_distribution: {
        Row: {
          contract_index: number
          created_at: string | null
          id: string
          offering_id: number | null
          transaction_hash: string
          updated_at: string | null
        }
        Insert: {
          contract_index: number
          created_at?: string | null
          id?: string
          offering_id?: number | null
          transaction_hash: string
          updated_at?: string | null
        }
        Update: {
          contract_index?: number
          created_at?: string | null
          id?: string
          offering_id?: number | null
          transaction_hash?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offering_distribution_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "offering"
            referencedColumns: ["id"]
          },
        ]
      }
      offering_participant: {
        Row: {
          address_offering_id: string
          chain_id: number
          created_at: string | null
          email_address: string | null
          external_id: string | null
          id: string
          jurisdiction_id: string | null
          max_pledge: number | null
          min_pledge: number | null
          name: string | null
          offering_id: number
          paid: boolean | null
          updated_at: string | null
          wallet_address: string
        }
        Insert: {
          address_offering_id: string
          chain_id: number
          created_at?: string | null
          email_address?: string | null
          external_id?: string | null
          id?: string
          jurisdiction_id?: string | null
          max_pledge?: number | null
          min_pledge?: number | null
          name?: string | null
          offering_id: number
          paid?: boolean | null
          updated_at?: string | null
          wallet_address: string
        }
        Update: {
          address_offering_id?: string
          chain_id?: number
          created_at?: string | null
          email_address?: string | null
          external_id?: string | null
          id?: string
          jurisdiction_id?: string | null
          max_pledge?: number | null
          min_pledge?: number | null
          name?: string | null
          offering_id?: number
          paid?: boolean | null
          updated_at?: string | null
          wallet_address?: string
        }
        Relationships: [
          {
            foreignKeyName: "offering_participant_jurisdiction_id_fkey"
            columns: ["jurisdiction_id"]
            isOneToOne: false
            referencedRelation: "jurisdiction"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offering_participant_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "offering"
            referencedColumns: ["id"]
          },
        ]
      }
      offering_smart_contract_set: {
        Row: {
          created_at: string | null
          distribution_contract_id: string | null
          id: string
          offering_id: number
          share_contract_id: string | null
          swap_contract_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          distribution_contract_id?: string | null
          id?: string
          offering_id: number
          share_contract_id?: string | null
          swap_contract_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          distribution_contract_id?: string | null
          id?: string
          offering_id?: number
          share_contract_id?: string | null
          swap_contract_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "offering_smart_contract_set_distribution_contract_id_fkey"
            columns: ["distribution_contract_id"]
            isOneToOne: false
            referencedRelation: "smart_contract"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offering_smart_contract_set_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "offering"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offering_smart_contract_set_share_contract_id_fkey"
            columns: ["share_contract_id"]
            isOneToOne: false
            referencedRelation: "smart_contract"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "offering_smart_contract_set_swap_contract_id_fkey"
            columns: ["swap_contract_id"]
            isOneToOne: false
            referencedRelation: "smart_contract"
            referencedColumns: ["id"]
          },
        ]
      }
      organization: {
        Row: {
          banner_image: string | null
          brand_color: string | null
          country: string | null
          created_at: string | null
          creation_date: string | null
          description: string | null
          id: number
          is_public: boolean | null
          logo: string | null
          name: string | null
          phone: string | null
          short_description: string | null
          slug: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          banner_image?: string | null
          brand_color?: string | null
          country?: string | null
          created_at?: string | null
          creation_date?: string | null
          description?: string | null
          id?: never
          is_public?: boolean | null
          logo?: string | null
          name?: string | null
          phone?: string | null
          short_description?: string | null
          slug?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          banner_image?: string | null
          brand_color?: string | null
          country?: string | null
          created_at?: string | null
          creation_date?: string | null
          description?: string | null
          id?: never
          is_public?: boolean | null
          logo?: string | null
          name?: string | null
          phone?: string | null
          short_description?: string | null
          slug?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      organization_user: {
        Row: {
          account_email: string | null
          created_at: string | null
          id: string
          organization_id: number
          permissions:
            | Database["public"]["Enums"]["organization_permission_type"][]
            | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_email?: string | null
          created_at?: string | null
          id?: string
          organization_id: number
          permissions?:
            | Database["public"]["Enums"]["organization_permission_type"][]
            | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_email?: string | null
          created_at?: string | null
          id?: string
          organization_id?: number
          permissions?:
            | Database["public"]["Enums"]["organization_permission_type"][]
            | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_user_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organization"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_user_user_id_profile_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          created_at: string | null
          id: string
          image: string | null
          name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          image?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image?: string | null
          name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      real_estate_property: {
        Row: {
          address_id: string | null
          amenities_description: string | null
          asset_value: number | null
          asset_value_note: string | null
          closing_costs: number | null
          created_at: string | null
          description: string | null
          down_payment: number | null
          id: string
          investment_status: Database["public"]["Enums"]["asset_status"] | null
          lender_fees: number | null
          loan: number | null
          offering_id: number
          property_type: Database["public"]["Enums"]["real_estate_property_type"]
          updated_at: string | null
        }
        Insert: {
          address_id?: string | null
          amenities_description?: string | null
          asset_value?: number | null
          asset_value_note?: string | null
          closing_costs?: number | null
          created_at?: string | null
          description?: string | null
          down_payment?: number | null
          id?: string
          investment_status?: Database["public"]["Enums"]["asset_status"] | null
          lender_fees?: number | null
          loan?: number | null
          offering_id: number
          property_type: Database["public"]["Enums"]["real_estate_property_type"]
          updated_at?: string | null
        }
        Update: {
          address_id?: string | null
          amenities_description?: string | null
          asset_value?: number | null
          asset_value_note?: string | null
          closing_costs?: number | null
          created_at?: string | null
          description?: string | null
          down_payment?: number | null
          id?: string
          investment_status?: Database["public"]["Enums"]["asset_status"] | null
          lender_fees?: number | null
          loan?: number | null
          offering_id?: number
          property_type?: Database["public"]["Enums"]["real_estate_property_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "real_estate_property_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "real_estate_property_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "offering"
            referencedColumns: ["id"]
          },
        ]
      }
      real_estate_property_image: {
        Row: {
          created_at: string | null
          id: string
          property_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          property_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          property_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "real_estate_property_image_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: true
            referencedRelation: "real_estate_property"
            referencedColumns: ["id"]
          },
        ]
      }
      share_order: {
        Row: {
          archived: boolean | null
          contract_index: number
          created_at: string | null
          id: string
          initiator: string
          max_units: number | null
          min_units: number | null
          swap_contract_address: string
          transaction_hash: string
          updated_at: string | null
          visible: boolean | null
        }
        Insert: {
          archived?: boolean | null
          contract_index: number
          created_at?: string | null
          id?: string
          initiator: string
          max_units?: number | null
          min_units?: number | null
          swap_contract_address: string
          transaction_hash: string
          updated_at?: string | null
          visible?: boolean | null
        }
        Update: {
          archived?: boolean | null
          contract_index?: number
          created_at?: string | null
          id?: string
          initiator?: string
          max_units?: number | null
          min_units?: number | null
          swap_contract_address?: string
          transaction_hash?: string
          updated_at?: string | null
          visible?: boolean | null
        }
        Relationships: []
      }
      share_transfer_event: {
        Row: {
          amount: number
          archived: boolean | null
          created_at: string | null
          currency_code: Database["public"]["Enums"]["currency_code"] | null
          id: string
          order_index: number | null
          partition: string
          price: string | null
          recipient_address: string
          sender_address: string
          share_contract_address: string
          transaction_hash: string
          type: Database["public"]["Enums"]["share_transfer_event_type"]
          updated_at: string | null
        }
        Insert: {
          amount: number
          archived?: boolean | null
          created_at?: string | null
          currency_code?: Database["public"]["Enums"]["currency_code"] | null
          id?: string
          order_index?: number | null
          partition: string
          price?: string | null
          recipient_address: string
          sender_address: string
          share_contract_address: string
          transaction_hash: string
          type: Database["public"]["Enums"]["share_transfer_event_type"]
          updated_at?: string | null
        }
        Update: {
          amount?: number
          archived?: boolean | null
          created_at?: string | null
          currency_code?: Database["public"]["Enums"]["currency_code"] | null
          id?: string
          order_index?: number | null
          partition?: string
          price?: string | null
          recipient_address?: string
          sender_address?: string
          share_contract_address?: string
          transaction_hash?: string
          type?: Database["public"]["Enums"]["share_transfer_event_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      smart_contract: {
        Row: {
          backing_token: Database["public"]["Enums"]["currency_code"] | null
          created_at: string | null
          crypto_address_id: string
          document_id: string | null
          established: boolean | null
          id: string
          name: string | null
          num_tokens_authorized: number | null
          owner_id: number
          partitions: string[] | null
          sub_type: string | null
          type: Database["public"]["Enums"]["smart_contract_type"]
          updated_at: string | null
        }
        Insert: {
          backing_token?: Database["public"]["Enums"]["currency_code"] | null
          created_at?: string | null
          crypto_address_id: string
          document_id?: string | null
          established?: boolean | null
          id?: string
          name?: string | null
          num_tokens_authorized?: number | null
          owner_id: number
          partitions?: string[] | null
          sub_type?: string | null
          type: Database["public"]["Enums"]["smart_contract_type"]
          updated_at?: string | null
        }
        Update: {
          backing_token?: Database["public"]["Enums"]["currency_code"] | null
          created_at?: string | null
          crypto_address_id?: string
          document_id?: string | null
          established?: boolean | null
          id?: string
          name?: string | null
          num_tokens_authorized?: number | null
          owner_id?: number
          partitions?: string[] | null
          sub_type?: string | null
          type?: Database["public"]["Enums"]["smart_contract_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "smart_contract_crypto_address_id_fkey"
            columns: ["crypto_address_id"]
            isOneToOne: false
            referencedRelation: "crypto_address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "smart_contract_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "document"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "smart_contract_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "legal_entity"
            referencedColumns: ["id"]
          },
        ]
      }
      whitelist_transaction: {
        Row: {
          created_at: string | null
          offering_participant_id: string
          transaction_hash: string
          type: Database["public"]["Enums"]["whitelist_transaction_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          offering_participant_id: string
          transaction_hash: string
          type: Database["public"]["Enums"]["whitelist_transaction_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          offering_participant_id?: string
          transaction_hash?: string
          type?: Database["public"]["Enums"]["whitelist_transaction_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whitelist_transaction_offering_participant_id_fkey"
            columns: ["offering_participant_id"]
            isOneToOne: false
            referencedRelation: "offering_participant"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_organization_with_admin: {
        Args: {
          p_country?: string
          p_logo?: string
          p_name: string
          p_short_description?: string
          p_slug?: string
          p_user_id: string
          p_website?: string
        }
        Returns: {
          organization_id: number
          organization_slug: string
          organization_user_id: string
        }[]
      }
      is_any_organization_admin: {
        Args: { p_user_id: string }
        Returns: boolean
      }
      is_organization_admin: {
        Args: { p_organization_id: number; p_user_id: string }
        Returns: boolean
      }
      is_organization_admin_for_legal_entity: {
        Args: { p_organization_id: number; p_user_id: string }
        Returns: boolean
      }
      is_organization_admin_or_editor: {
        Args: { p_organization_id: number; p_user_id: string }
        Returns: boolean
      }
      is_organization_admin_or_editor_for_legal_entity: {
        Args: { p_organization_id: number; p_user_id: string }
        Returns: boolean
      }
      is_organization_editor_for_legal_entity: {
        Args: { p_organization_id: number; p_user_id: string }
        Returns: boolean
      }
      is_organization_member: {
        Args: { p_organization_id: number; p_user_id: string }
        Returns: boolean
      }
      is_organization_viewer_or_better: {
        Args: { p_organization_id: number; p_user_id: string }
        Returns: boolean
      }
      organization_has_no_members: {
        Args: { p_organization_id: number }
        Returns: boolean
      }
    }
    Enums: {
      asset_status:
        | "IDENTIFIED"
        | "IN_NEGOTIATION"
        | "DUE_DILIGENCE"
        | "UNDER_CONTRACT"
        | "CLOSED"
        | "FOR_SALE"
      crypto_address_protocol: "ETH" | "BTC" | "ADA" | "ALGO"
      crypto_address_type: "WALLET" | "CONTRACT"
      currency_code:
        | "CC"
        | "USD"
        | "KYD"
        | "AUD"
        | "CAD"
        | "EUR"
        | "GBP"
        | "BTC"
        | "ETH"
        | "ADA"
        | "MATIC"
        | "USDC"
        | "ALGO_USDC"
        | "PoS_USDC"
        | "DAI"
        | "PoS_DAI"
        | "USDC_TEST_"
        | "DAI_TEST_"
        | "ALGO_USDC_TEST_"
        | "USDC_MATIC_TEST_"
        | "DAI_MATIC_TEST_"
        | "REAL_SHARE"
      distribution_period_type:
        | "DAY"
        | "WEEK"
        | "MONTH"
        | "QUARTER"
        | "YEAR"
        | "UNSPECIFIED"
        | "DESCRIBED"
        | "NONE"
      document_access_type: "OWNER" | "SIGNATORY" | "TOKEN" | "PUBLIC"
      document_format:
        | "GOOGLE_DRIVE"
        | "GOOGLE_DOC"
        | "GOOGLE_SHEET"
        | "GOOGLE_SLIDE"
        | "WORD_DOC"
        | "EXCEL"
        | "POWERPOINT"
        | "PDF"
        | "NOTION"
        | "GITHUB"
        | "MARKDOWN"
        | "VIDEO"
        | "OTHER"
      document_type:
        | "GENERAL"
        | "SHARE_LINK"
        | "PPM"
        | "OPERATING_AGREEMENT"
        | "DISCLOSURE"
        | "REG_FILING"
        | "FINANCIAL_STATEMENT"
        | "AGREEMENT"
        | "OTHER"
        | "OFFERING_DOCUMENT"
      legal_entity_type:
        | "INDIVIDUAL"
        | "CORPORATION"
        | "LLC"
        | "UNINCORPORATED_ASSOCIATION"
      linked_account_type:
        | "LINKEDIN"
        | "FACEBOOK"
        | "TWITTER"
        | "INSTAGRAM"
        | "DISCORD"
        | "TELEGRAM"
        | "MEDIUM"
        | "MIRROR"
        | "SUBSTACK"
        | "YOUTUBE"
        | "SOUNDCLOUD"
        | "DRIBBBLE"
        | "GITHUB"
        | "EMAIL"
        | "PHONE"
        | "WEBSITE"
        | "OTHER"
      notification_method: "EMAIL"
      notification_recipient_type: "MANAGER" | "PARTICIPANT"
      notification_subject:
        | "TRANSACTION_REQUEST"
        | "OFFERING_DISTRIBUTION"
        | "TRADE_EXECUTION"
        | "WHITELIST_APPROVAL"
        | "PROCEEDS_CLAIM"
        | "NEW_ORDER_LIVE"
      offering_stage:
        | "IDENTIFIED"
        | "IN_NEGOTIATION"
        | "DUE_DILIGENCE"
        | "SALE"
        | "LOCKED"
        | "CLOSED"
      offering_tab_section:
        | "DETAILS"
        | "FINANCIALS"
        | "TERMS"
        | "OFFEROR_INFO"
        | "DISCLOSURES"
      offering_type:
        | "CRYPTO"
        | "PRIVATE_EQUITY"
        | "REAL_ESTATE"
        | "VENTURE_CAPITAL"
        | "OTHER"
      organization_permission_type: "ADMIN" | "EDITOR" | "VIEWER" | "AUDITOR"
      organization_user_role:
        | "BOARD_MEMBER"
        | "PARTNER"
        | "TEAM"
        | "INVESTOR"
        | "ADVISOR"
        | "SUPPORTER"
      real_estate_property_type:
        | "SINGLE_FAMILY"
        | "MULTI_FAMILY"
        | "COMMERCIAL"
        | "LAND_ONLY"
        | "SELF_STORAGE"
      share_transfer_event_type:
        | "ISSUANCE"
        | "TRADE"
        | "FORCED"
        | "TRANSFER"
        | "DISAPPROVAL"
        | "APPROVAL"
      smart_contract_type:
        | "C2"
        | "C3"
        | "ERC1410"
        | "ERC20"
        | "SWAP"
        | "DISTRIBUTION"
        | "OTHER"
      unit_name: "SHARE" | "TOKEN" | "UNIT" | "MEMBERSHIP_INTEREST"
      whitelist_transaction_type: "ADD" | "REMOVE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      asset_status: [
        "IDENTIFIED",
        "IN_NEGOTIATION",
        "DUE_DILIGENCE",
        "UNDER_CONTRACT",
        "CLOSED",
        "FOR_SALE",
      ],
      crypto_address_protocol: ["ETH", "BTC", "ADA", "ALGO"],
      crypto_address_type: ["WALLET", "CONTRACT"],
      currency_code: [
        "CC",
        "USD",
        "KYD",
        "AUD",
        "CAD",
        "EUR",
        "GBP",
        "BTC",
        "ETH",
        "ADA",
        "MATIC",
        "USDC",
        "ALGO_USDC",
        "PoS_USDC",
        "DAI",
        "PoS_DAI",
        "USDC_TEST_",
        "DAI_TEST_",
        "ALGO_USDC_TEST_",
        "USDC_MATIC_TEST_",
        "DAI_MATIC_TEST_",
        "REAL_SHARE",
      ],
      distribution_period_type: [
        "DAY",
        "WEEK",
        "MONTH",
        "QUARTER",
        "YEAR",
        "UNSPECIFIED",
        "DESCRIBED",
        "NONE",
      ],
      document_access_type: ["OWNER", "SIGNATORY", "TOKEN", "PUBLIC"],
      document_format: [
        "GOOGLE_DRIVE",
        "GOOGLE_DOC",
        "GOOGLE_SHEET",
        "GOOGLE_SLIDE",
        "WORD_DOC",
        "EXCEL",
        "POWERPOINT",
        "PDF",
        "NOTION",
        "GITHUB",
        "MARKDOWN",
        "VIDEO",
        "OTHER",
      ],
      document_type: [
        "GENERAL",
        "SHARE_LINK",
        "PPM",
        "OPERATING_AGREEMENT",
        "DISCLOSURE",
        "REG_FILING",
        "FINANCIAL_STATEMENT",
        "AGREEMENT",
        "OTHER",
        "OFFERING_DOCUMENT",
      ],
      legal_entity_type: [
        "INDIVIDUAL",
        "CORPORATION",
        "LLC",
        "UNINCORPORATED_ASSOCIATION",
      ],
      linked_account_type: [
        "LINKEDIN",
        "FACEBOOK",
        "TWITTER",
        "INSTAGRAM",
        "DISCORD",
        "TELEGRAM",
        "MEDIUM",
        "MIRROR",
        "SUBSTACK",
        "YOUTUBE",
        "SOUNDCLOUD",
        "DRIBBBLE",
        "GITHUB",
        "EMAIL",
        "PHONE",
        "WEBSITE",
        "OTHER",
      ],
      notification_method: ["EMAIL"],
      notification_recipient_type: ["MANAGER", "PARTICIPANT"],
      notification_subject: [
        "TRANSACTION_REQUEST",
        "OFFERING_DISTRIBUTION",
        "TRADE_EXECUTION",
        "WHITELIST_APPROVAL",
        "PROCEEDS_CLAIM",
        "NEW_ORDER_LIVE",
      ],
      offering_stage: [
        "IDENTIFIED",
        "IN_NEGOTIATION",
        "DUE_DILIGENCE",
        "SALE",
        "LOCKED",
        "CLOSED",
      ],
      offering_tab_section: [
        "DETAILS",
        "FINANCIALS",
        "TERMS",
        "OFFEROR_INFO",
        "DISCLOSURES",
      ],
      offering_type: [
        "CRYPTO",
        "PRIVATE_EQUITY",
        "REAL_ESTATE",
        "VENTURE_CAPITAL",
        "OTHER",
      ],
      organization_permission_type: ["ADMIN", "EDITOR", "VIEWER", "AUDITOR"],
      organization_user_role: [
        "BOARD_MEMBER",
        "PARTNER",
        "TEAM",
        "INVESTOR",
        "ADVISOR",
        "SUPPORTER",
      ],
      real_estate_property_type: [
        "SINGLE_FAMILY",
        "MULTI_FAMILY",
        "COMMERCIAL",
        "LAND_ONLY",
        "SELF_STORAGE",
      ],
      share_transfer_event_type: [
        "ISSUANCE",
        "TRADE",
        "FORCED",
        "TRANSFER",
        "DISAPPROVAL",
        "APPROVAL",
      ],
      smart_contract_type: [
        "C2",
        "C3",
        "ERC1410",
        "ERC20",
        "SWAP",
        "DISTRIBUTION",
        "OTHER",
      ],
      unit_name: ["SHARE", "TOKEN", "UNIT", "MEMBERSHIP_INTEREST"],
      whitelist_transaction_type: ["ADD", "REMOVE"],
    },
  },
} as const

