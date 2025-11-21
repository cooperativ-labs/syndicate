
-- Independent Chain Data Enums
CREATE TYPE share_transfer_event_type AS ENUM (
    'ISSUANCE',
    'TRADE', 
    'FORCED',
    'TRANSFER',
    'DISAPPROVAL',
    'APPROVAL'
);

-- Document Enums
CREATE TYPE document_format AS ENUM (
    'GOOGLE_DRIVE',
    'GOOGLE_DOC',
    'GOOGLE_SHEET',
    'GOOGLE_SLIDE',
    'WORD_DOC',
    'EXCEL',
    'POWERPOINT',
    'PDF',
    'NOTION',
    'GITHUB',
    'MARKDOWN',
    'VIDEO',
    'OTHER'
);

CREATE TYPE document_type AS ENUM (
    'GENERAL',
    'SHARE_LINK',
    'PPM',
    'OPERATING_AGREEMENT',
    'DISCLOSURE',
    'REG_FILING',
    'FINANCIAL_STATEMENT',
    'AGREEMENT',
    'OTHER',
    'OFFERING_DOCUMENT'
);

CREATE TYPE document_access_type AS ENUM (
    'OWNER',
    'SIGNATORY',
    'TOKEN',
    'PUBLIC'
);

-- Crypto Enums
CREATE TYPE crypto_address_protocol AS ENUM (
    'ETH',
    'BTC',
    'ADA',
    'ALGO'
);

CREATE TYPE crypto_address_type AS ENUM (
    'WALLET',
    'CONTRACT'
);

CREATE TYPE smart_contract_type AS ENUM (
    'C2',
    'C3',
    'ERC1410',
    'ERC20',
    'SWAP',
    'DISTRIBUTION',
    'OTHER'
);

-- Offering Enums
CREATE TYPE offering_tab_section AS ENUM (
    'DETAILS',
    'FINANCIALS',
    'TERMS',
    'OFFEROR_INFO',
    'DISCLOSURES'
);

CREATE TYPE offering_type AS ENUM (
    'CRYPTO',
    'PRIVATE_EQUITY',
    'REAL_ESTATE',
    'VENTURE_CAPITAL',
    'OTHER'
);

CREATE TYPE unit_name AS ENUM (
    'SHARE',
    'TOKEN',
    'UNIT',
    'MEMBERSHIP_INTEREST'
);

CREATE TYPE distribution_period_type AS ENUM (
    'DAY',
    'WEEK',
    'MONTH',
    'QUARTER',
    'YEAR',
    'UNSPECIFIED',
    'DESCRIBED',
    'NONE'
);

CREATE TYPE offering_stage AS ENUM (
    'IDENTIFIED',
    'IN_NEGOTIATION',
    'DUE_DILIGENCE',
    'SALE',
    'LOCKED',
    'CLOSED'
);

CREATE TYPE whitelist_transaction_type AS ENUM (
    'ADD',
    'REMOVE'
);

-- Real Estate Enums
CREATE TYPE asset_status AS ENUM (
    'IDENTIFIED',
    'IN_NEGOTIATION',
    'DUE_DILIGENCE',
    'UNDER_CONTRACT',
    'CLOSED',
    'FOR_SALE'
);

CREATE TYPE real_estate_property_type AS ENUM (
    'SINGLE_FAMILY',
    'MULTI_FAMILY',
    'COMMERCIAL',
    'LAND_ONLY',
    'SELF_STORAGE'
);

-- Organization Enums
CREATE TYPE notification_recipient_type AS ENUM (
    'MANAGER',
    'PARTICIPANT'
);

CREATE TYPE notification_method AS ENUM (
    'EMAIL'
);

CREATE TYPE notification_subject AS ENUM (
    'TRANSACTION_REQUEST',
    'OFFERING_DISTRIBUTION',
    'TRADE_EXECUTION',
    'WHITELIST_APPROVAL',
    'PROCEEDS_CLAIM',
    'NEW_ORDER_LIVE'
);

CREATE TYPE linked_account_type AS ENUM (
    'LINKEDIN',
    'FACEBOOK',
    'TWITTER',
    'INSTAGRAM',
    'DISCORD',
    'TELEGRAM',
    'MEDIUM',
    'MIRROR',
    'SUBSTACK',
    'YOUTUBE',
    'SOUNDCLOUD',
    'DRIBBBLE',
    'GITHUB',
    'EMAIL',
    'PHONE',
    'WEBSITE',
    'OTHER'
);

CREATE TYPE legal_entity_type AS ENUM (
    'INDIVIDUAL',
    'CORPORATION',
    'LLC',
    'UNINCORPORATED_ASSOCIATION'
);

CREATE TYPE organization_user_role AS ENUM (
    'BOARD_MEMBER',
    'PARTNER',
    'TEAM',
    'INVESTOR',
    'ADVISOR',
    'SUPPORTER'
);

CREATE TYPE organization_permission_type AS ENUM (
    'ADMIN',
    'EDITOR',
    'VIEWER',
    'AUDITOR'
);

CREATE TYPE currency_code AS ENUM (
    'CC',
    'USD',
    'KYD',
    'AUD',
    'CAD',
    'EUR',
    'GBP',
    'BTC',
    'ETH',
    'ADA',
    'MATIC',
    'USDC',
    'ALGO_USDC',
    'PoS_USDC',
    'DAI',
    'PoS_DAI',
    'USDC_TEST_',
    'DAI_TEST_',
    'ALGO_USDC_TEST_',
    'USDC_MATIC_TEST_',
    'DAI_MATIC_TEST_',
    'REAL_SHARE'
);

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Note: Users are managed by Supabase Auth in the auth.users table
-- We'll create a public profiles table to extend user data
CREATE TABLE profile (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    image TEXT,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations table
CREATE TABLE organization (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT,
    logo TEXT,
    slug TEXT UNIQUE,
    banner_image TEXT,
    brand_color TEXT,
    short_description TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    phone TEXT,
    country TEXT,
    website TEXT,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organization Users junction table
CREATE TABLE organization_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id BIGINT NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    permissions organization_permission_type[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- Jurisdictions table
CREATE TABLE jurisdiction (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country TEXT NOT NULL,
    province TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legal Entities table
CREATE TABLE legal_entity (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    organization_id BIGINT NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
    display_name TEXT,
    legal_name TEXT,
    type legal_entity_type NOT NULL,
    tax_id TEXT,
    purpose TEXT,
    jurisdiction_id UUID REFERENCES jurisdiction(id),
    operating_currency currency_code,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legal Entity relationship (self-referencing)
CREATE TABLE legal_entity_relationship (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_entity_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    child_entity_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('owner', 'subsidiary')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_entity_id, child_entity_id, relationship_type)
);

-- Addresses table
CREATE TABLE address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legal_entity_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    label TEXT,
    line1 TEXT,
    line2 TEXT,
    line3 TEXT,
    city TEXT NOT NULL,
    state_province TEXT,
    postal_code TEXT,
    country TEXT NOT NULL,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email Addresses table
CREATE TABLE email_address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id BIGINT NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
    address TEXT UNIQUE NOT NULL,
    name TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Linked Accounts table
CREATE TABLE linked_account (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id BIGINT NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
    account_provided_id TEXT,
    username TEXT,
    url TEXT NOT NULL,
    type linked_account_type,
    verified BOOLEAN DEFAULT false,
    hidden BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crypto Addresses table
CREATE TABLE crypto_address (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    legal_entity_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    name TEXT,
    address TEXT UNIQUE NOT NULL,
    description TEXT,
    protocol crypto_address_protocol,
    chain_id INTEGER,
    type crypto_address_type,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Offerings table
CREATE TABLE offering (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    image TEXT,
    banner_image TEXT,
    primary_video TEXT,
    sharing_image TEXT,
    brand_color TEXT,
    light_brand BOOLEAN DEFAULT false,
    website TEXT,
    short_description TEXT,
    offering_entity_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    is_public BOOLEAN DEFAULT false,
    waitlist_on BOOLEAN DEFAULT false,
    access_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    custom_onboarding_link TEXT,
    type offering_type,
    stage offering_stage,
    investment_currency currency_code NOT NULL,
    unit_name unit_name,
    max_raise BIGINT,
    min_raise BIGINT,
    num_units INTEGER,
    min_units_per_investor INTEGER,
    max_units_per_investor INTEGER,
    price_start INTEGER,
    max_investors INTEGER,
    min_investors INTEGER,
    raise_start TIMESTAMPTZ,
    raise_period INTEGER,
    additional_info TEXT,
    distribution_period distribution_period_type,
    distribution_frequency INTEGER,
    distribution_currency currency_code,
    distribution_description TEXT,
    admin_expense INTEGER,
    projected_irr INTEGER,
    projected_irr_max INTEGER,
    preferred_return INTEGER,
    target_equity_multiple INTEGER,
    target_equity_multiple_max INTEGER,
    coc_return INTEGER,
    projected_appreciation INTEGER,
    cap_rate INTEGER
);

-- Offering Description Text table
CREATE TABLE offering_description_text (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section offering_tab_section NOT NULL,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    offering_id BIGINT NOT NULL REFERENCES offering(id) ON DELETE CASCADE,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Participants table
CREATE TABLE offering_participant (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address_offering_id TEXT UNIQUE NOT NULL,
    wallet_address TEXT NOT NULL,
    email_address TEXT,
    chain_id INTEGER NOT NULL,
    name TEXT,
    offering_id BIGINT NOT NULL REFERENCES offering(id) ON DELETE CASCADE,
    min_pledge INTEGER,
    max_pledge INTEGER,
    jurisdiction_id UUID REFERENCES jurisdiction(id),
    paid BOOLEAN DEFAULT false,
    external_id TEXT,
    last_update TIMESTAMPTZ DEFAULT NOW(),
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE document (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT,
    text TEXT,
    date TIMESTAMPTZ,
    format document_format,
    type document_type,
    url TEXT,
    file_id TEXT,
    thumbnail_image TEXT,
    owner_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    smart_contract_id UUID,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    access document_access_type,
    offering_id BIGINT REFERENCES offering(id) ON DELETE CASCADE,
    offering_unique_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document Signatories table
CREATE TABLE document_signatory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES document(id) ON DELETE CASCADE,
    legal_entity_id BIGINT REFERENCES legal_entity(id) ON DELETE SET NULL,
    signer_address TEXT,
    signature TEXT,
    date TIMESTAMPTZ,
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Smart Contracts table
CREATE TABLE smart_contract (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    crypto_address_id UUID NOT NULL REFERENCES crypto_address(id) ON DELETE CASCADE,
    type smart_contract_type NOT NULL,
    sub_type TEXT,
    num_tokens_authorized BIGINT,
    backing_token currency_code,
    owner_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    name TEXT,
    document_id UUID REFERENCES document(id),
    established BOOLEAN DEFAULT false,
    partitions TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Smart Contract Sets table
CREATE TABLE offering_smart_contract_set (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offering_id BIGINT NOT NULL REFERENCES offering(id) ON DELETE CASCADE,
    share_contract_id UUID REFERENCES smart_contract(id),
    swap_contract_id UUID REFERENCES smart_contract(id),
    distribution_contract_id UUID REFERENCES smart_contract(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Whitelist Transactions table
CREATE TABLE whitelist_transaction (
    transaction_hash TEXT PRIMARY KEY,
    offering_participant_id UUID NOT NULL REFERENCES offering_participant(id) ON DELETE CASCADE,
    type whitelist_transaction_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investor Applications table
CREATE TABLE investor_application (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offering_participant_id UUID NOT NULL REFERENCES offering_participant(id) ON DELETE CASCADE,
    application_doc_id UUID NOT NULL REFERENCES document(id) ON DELETE CASCADE,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real Estate Properties table
CREATE TABLE real_estate_property (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_type real_estate_property_type NOT NULL,
    investment_status asset_status,
    address_id UUID REFERENCES address(id),
    amenities_description TEXT,
    description TEXT,
    loan INTEGER,
    down_payment INTEGER,
    asset_value INTEGER,
    asset_value_note TEXT,
    lender_fees INTEGER,
    closing_costs INTEGER,
        owner_id BIGINT NOT NULL REFERENCES legal_entity(id) ON DELETE CASCADE,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real Estate Property Images junction table
CREATE TABLE real_estate_property_image (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES real_estate_property(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(property_id)
);

-- Notification Configurations table
CREATE TABLE notification_configuration (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notification_recipient_type notification_recipient_type NOT NULL,
    notification_method notification_method NOT NULL,
    notification_subject notification_subject NOT NULL,
    organization_user_id UUID NOT NULL REFERENCES organization_user(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Share Transfer Events table (Independent Chain Data)
CREATE TABLE share_transfer_event (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    share_contract_address TEXT NOT NULL,
    order_index INTEGER,
    recipient_address TEXT NOT NULL,
    sender_address TEXT NOT NULL,
    amount INTEGER NOT NULL,
    price TEXT,
    currency_code currency_code,
    partition TEXT NOT NULL,
    transaction_hash TEXT NOT NULL,
    type share_transfer_event_type NOT NULL,
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Share Orders table (Independent Chain Data)
CREATE TABLE share_order (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    min_units INTEGER,
    max_units INTEGER,
    visible BOOLEAN DEFAULT true,
    swap_contract_address TEXT NOT NULL,
    initiator TEXT NOT NULL,
    contract_index INTEGER NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    transaction_hash TEXT NOT NULL,
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Distributions table (Independent Chain Data)
CREATE TABLE offering_distribution (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contract_index INTEGER NOT NULL,
    transaction_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: Supabase Auth handles sessions, accounts, and verification tokens
-- These are managed in the auth schema by Supabase automatically

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Profiles indexes
CREATE INDEX idx_profiles_creation_date ON profile(creation_date);

-- Organizations indexes
CREATE INDEX idx_organization_slug ON organization(slug);
CREATE INDEX idx_organization_name_gin ON organization USING gin(to_tsvector('english', name));
CREATE INDEX idx_organization_is_public ON organization(is_public);

-- Organization Users indexes
CREATE INDEX idx_organization_user_org_id ON organization_user(organization_id);
CREATE INDEX idx_organization_user_user_id ON organization_user(user_id);
CREATE INDEX idx_organization_user_permissions ON organization_user USING gin(permissions);

-- Legal Entities indexes
CREATE INDEX idx_legal_entity_org_id ON legal_entity(organization_id);
CREATE INDEX idx_legal_entity_display_name_gin ON legal_entity USING gin(to_tsvector('english', display_name));
CREATE INDEX idx_legal_entity_legal_name_gin ON legal_entity USING gin(to_tsvector('english', legal_name));
CREATE INDEX idx_legal_entity_type ON legal_entity(type);

-- Addresses indexes
CREATE INDEX idx_address_legal_entity_id ON address(legal_entity_id);
CREATE INDEX idx_address_city ON address(city);
CREATE INDEX idx_address_country ON address(country);

-- Email Addresses indexes
CREATE INDEX idx_email_address_org_id ON email_address(organization_id);
CREATE INDEX idx_email_address_address ON email_address(address);
CREATE INDEX idx_email_address_is_public ON email_address(is_public);

-- Linked Accounts indexes
CREATE INDEX idx_linked_account_org_id ON linked_account(organization_id);
CREATE INDEX idx_linked_account_username ON linked_account(username);
CREATE INDEX idx_linked_account_type ON linked_account(type);

-- Documents indexes
CREATE INDEX idx_document_owner_id ON document(owner_id);
CREATE INDEX idx_document_offering_id ON document(offering_id);
CREATE INDEX idx_document_offering_unique_id ON document(offering_unique_id);
CREATE INDEX idx_document_file_id ON document(file_id);
CREATE INDEX idx_document_type ON document(type);
CREATE INDEX idx_document_format ON document(format);

-- Document Signatories indexes
CREATE INDEX idx_document_signatory_document_id ON document_signatory(document_id);
CREATE INDEX idx_document_signatory_legal_entity_id ON document_signatory(legal_entity_id);

-- Crypto Addresses indexes
CREATE INDEX idx_crypto_address_legal_entity_id ON crypto_address(legal_entity_id);
CREATE INDEX idx_crypto_address_address ON crypto_address(address);
CREATE INDEX idx_crypto_address_protocol ON crypto_address(protocol);
CREATE INDEX idx_crypto_address_type ON crypto_address(type);
CREATE INDEX idx_crypto_address_is_public ON crypto_address(is_public);

-- Smart Contracts indexes
CREATE INDEX idx_smart_contract_crypto_address_id ON smart_contract(crypto_address_id);
CREATE INDEX idx_smart_contract_owner_id ON smart_contract(owner_id);
CREATE INDEX idx_smart_contract_type ON smart_contract(type);

-- Offerings indexes
CREATE INDEX idx_offering_offering_entity_id ON offering(offering_entity_id);
CREATE INDEX idx_offering_name_gin ON offering USING gin(to_tsvector('english', name));
CREATE INDEX idx_offering_is_public ON offering(is_public);
CREATE INDEX idx_offering_creation_date ON offering(creation_date);
CREATE INDEX idx_offering_type ON offering(type);
CREATE INDEX idx_offering_stage ON offering(stage);

-- Offering Description Texts indexes
CREATE INDEX idx_offering_description_text_offering_id ON offering_description_text(offering_id);
CREATE INDEX idx_offering_description_text_section ON offering_description_text(section);
CREATE INDEX idx_offering_description_text_order ON offering_description_text("order");

-- Offering Smart Contract Sets indexes
CREATE INDEX idx_offering_smart_contract_set_offering_id ON offering_smart_contract_set(offering_id);

-- Offering Participants indexes
CREATE INDEX idx_offering_participant_offering_id ON offering_participant(offering_id);
CREATE INDEX idx_offering_participant_wallet_address_gin ON offering_participant USING gin(to_tsvector('english', wallet_address));
CREATE INDEX idx_offering_participant_address_offering_id ON offering_participant(address_offering_id);
CREATE INDEX idx_offering_participant_email_address ON offering_participant(email_address);

-- Whitelist Transactions indexes
CREATE INDEX idx_whitelist_transaction_offering_participant_id ON whitelist_transaction(offering_participant_id);
CREATE INDEX idx_whitelist_transaction_type ON whitelist_transaction(type);

-- Investor Applications indexes
CREATE INDEX idx_investor_application_offering_participant_id ON investor_application(offering_participant_id);
CREATE INDEX idx_investor_application_application_doc_id ON investor_application(application_doc_id);

-- Real Estate Properties indexes
CREATE INDEX idx_real_estate_property_owner_id ON real_estate_property(owner_id);
CREATE INDEX idx_real_estate_property_property_type ON real_estate_property(property_type);
CREATE INDEX idx_real_estate_property_investment_status ON real_estate_property(investment_status);

-- Share Transfer Events indexes
CREATE INDEX idx_share_transfer_event_share_contract_address ON share_transfer_event(share_contract_address);
CREATE INDEX idx_share_transfer_event_recipient_address ON share_transfer_event(recipient_address);
CREATE INDEX idx_share_transfer_event_sender_address ON share_transfer_event(sender_address);
CREATE INDEX idx_share_transfer_event_partition ON share_transfer_event(partition);
CREATE INDEX idx_share_transfer_event_type ON share_transfer_event(type);

-- Share Orders indexes
CREATE INDEX idx_share_order_swap_contract_address ON share_order(swap_contract_address);
CREATE INDEX idx_share_order_initiator ON share_order(initiator);
CREATE INDEX idx_share_order_visible ON share_order(visible);

-- Note: Supabase Auth manages its own indexes for auth.users, auth.sessions, etc.

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_entity ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_entity_relationship ENABLE ROW LEVEL SECURITY;
ALTER TABLE address ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_address ENABLE ROW LEVEL SECURITY;
ALTER TABLE linked_account ENABLE ROW LEVEL SECURITY;
ALTER TABLE document ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_signatory ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto_address ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_contract ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_description_text ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_smart_contract_set ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_participant ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitelist_transaction ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_application ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_property ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_property_image ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_configuration ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_transfer_event ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_order ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_distribution ENABLE ROW LEVEL SECURITY;
-- Note: Supabase Auth tables (auth.users, auth.sessions, etc.) have their own RLS policies

-- Basic RLS policies (users can access their own data and organization data they belong to)
-- Note: These are basic policies. You'll need to implement more sophisticated authorization
-- based on your specific business logic and the complex auth rules from the Dgraph schema.

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profile
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profile
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profile
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Organization members can view organization data
CREATE POLICY "Organization members can view organization" ON organization
    FOR SELECT USING (
        id IN (
            SELECT organization_id 
            FROM organization_user 
            WHERE user_id = auth.uid()
        )
    );

-- Organization admins can update organization
CREATE POLICY "Organization admins can update organization" ON organization
    FOR UPDATE USING (
        id IN (
            SELECT organization_id 
            FROM organization_user 
            WHERE user_id = auth.uid() 
            AND 'ADMIN' = ANY(permissions)
        )
    );

-- Organization members can view organization users
CREATE POLICY "Organization members can view organization users" ON organization_user
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id 
            FROM organization_user 
            WHERE user_id = auth.uid()
        )
    );

-- Organization admins can manage organization users
CREATE POLICY "Organization admins can manage organization users" ON organization_user
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id 
            FROM organization_user 
            WHERE user_id = auth.uid() 
            AND 'ADMIN' = ANY(permissions)
        )
    );

CREATE POLICY "Authenticated users can create organizations" ON organization
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
-- Similar patterns for other tables...
-- (Additional RLS policies would be implemented based on specific business requirements)

-- ============================================================================
-- FUNCTIONS AND TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profile (id, name, image)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name'),
        NEW.raw_user_meta_data->>'avatar_url'
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to automatically create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add updated_at triggers to all tables with updated_at columns
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organization_updated_at BEFORE UPDATE ON organization FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organization_users_updated_at BEFORE UPDATE ON organization_user FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_legal_entity_updated_at BEFORE UPDATE ON legal_entity FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_address_updated_at BEFORE UPDATE ON address FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_address_updated_at BEFORE UPDATE ON email_address FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_linked_account_updated_at BEFORE UPDATE ON linked_account FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON document FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_signatory_updated_at BEFORE UPDATE ON document_signatory FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crypto_address_updated_at BEFORE UPDATE ON crypto_address FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smart_contract_updated_at BEFORE UPDATE ON smart_contract FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_updated_at BEFORE UPDATE ON offering FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_description_text_updated_at BEFORE UPDATE ON offering_description_text FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_smart_contract_set_updated_at BEFORE UPDATE ON offering_smart_contract_set FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_participant_updated_at BEFORE UPDATE ON offering_participant FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_whitelist_transaction_updated_at BEFORE UPDATE ON whitelist_transaction FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investor_application_updated_at BEFORE UPDATE ON investor_application FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_real_estate_property_updated_at BEFORE UPDATE ON real_estate_property FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_configuration_updated_at BEFORE UPDATE ON notification_configuration FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_share_transfer_event_updated_at BEFORE UPDATE ON share_transfer_event FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_share_order_updated_at BEFORE UPDATE ON share_order FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_distribution_updated_at BEFORE UPDATE ON offering_distribution FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Note: Supabase Auth tables don't need updated_at triggers as they're managed by Supabase

-- ============================================================================
-- COMMENTS
-- ============================================================================

-- Add comments to tables for documentation
COMMENT ON TABLE profile IS 'User profiles extending Supabase Auth users with additional data';
COMMENT ON TABLE organization IS 'Organizations that manage offerings and legal entities';
COMMENT ON TABLE legal_entity IS 'Legal entities (individuals, corporations, LLCs) that can own offerings';
COMMENT ON TABLE offering IS 'Investment offerings managed by legal entities';
COMMENT ON TABLE offering_description_text IS 'Documents associated with offerings and legal entities';
COMMENT ON TABLE offering_smart_contract_set IS 'Blockchain smart contracts for offerings';
COMMENT ON TABLE offering_participant IS 'Blockchain events for share transfers (independent chain data)';
COMMENT ON TABLE whitelist_transaction IS 'Share trading orders (independent chain data)';
COMMENT ON TABLE investor_application IS 'Share trading orders (independent chain data)';
COMMENT ON TABLE real_estate_property IS 'Share trading orders (independent chain data)';
COMMENT ON TABLE notification_configuration IS 'Share trading orders (independent chain data)';
COMMENT ON TABLE share_transfer_event IS 'Share trading orders (independent chain data)';
COMMENT ON TABLE share_order IS 'Share trading orders (independent chain data)';
COMMENT ON TABLE offering_distribution IS 'Share trading orders (independent chain data)';

-- Migration completed successfully
-- This migration creates a complete PostgreSQL schema equivalent to the Dgraph schema
-- with proper relationships, indexes, and basic Row Level Security policies.
