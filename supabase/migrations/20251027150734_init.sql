-- Supabase Migration: Convert Dgraph Schema to PostgreSQL
-- This migration creates all tables, enums, and relationships from the Dgraph schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ============================================================================
-- ENUMS
-- ============================================================================

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

CREATE TYPE offering_details_type AS ENUM (
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
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    image TEXT,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE TABLE organization_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    permissions organization_permission_type[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, user_id)
);

-- Jurisdictions table
CREATE TABLE jurisdictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country TEXT NOT NULL,
    province TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legal Entities table
CREATE TABLE legal_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    display_name TEXT,
    legal_name TEXT,
    type legal_entity_type NOT NULL,
    tax_id TEXT,
    purpose TEXT,
    jurisdiction_id UUID REFERENCES jurisdictions(id),
    operating_currency currency_code,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Legal Entity relationships (self-referencing)
CREATE TABLE legal_entity_relationships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_entity_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
    child_entity_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('owner', 'subsidiary')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(parent_entity_id, child_entity_id, relationship_type)
);

-- Addresses table
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    legal_entity_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
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
CREATE TABLE email_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    address TEXT UNIQUE NOT NULL,
    name TEXT,
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Linked Accounts table
CREATE TABLE linked_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    account_provided_id TEXT,
    username TEXT,
    url TEXT NOT NULL,
    type linked_account_type,
    verified BOOLEAN DEFAULT false,
    hidden BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Images table
CREATE TABLE images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label TEXT,
    url TEXT NOT NULL,
    file_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT,
    text TEXT,
    date TIMESTAMPTZ,
    format document_format,
    type document_type,
    url TEXT,
    file_id TEXT,
    thumbnail_image_id UUID REFERENCES images(id),
    owner_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
    smart_contract_id UUID,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    access document_access_type,
    offering_id UUID,
    offering_unique_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Document Signatories table
CREATE TABLE document_signatories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    legal_entity_id UUID REFERENCES legal_entities(id) ON DELETE SET NULL,
    signer_address TEXT,
    signature TEXT,
    date TIMESTAMPTZ,
    archived BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crypto Addresses table
CREATE TABLE crypto_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    legal_entity_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
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

-- Smart Contracts table
CREATE TABLE smart_contracts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crypto_address_id UUID NOT NULL REFERENCES crypto_addresses(id) ON DELETE CASCADE,
    type smart_contract_type NOT NULL,
    sub_type TEXT,
    num_tokens_authorized BIGINT,
    backing_token currency_code,
    owner_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
    name TEXT,
    document_id UUID REFERENCES documents(id),
    established BOOLEAN DEFAULT false,
    partitions TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offerings table
CREATE TABLE offerings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    image TEXT,
    banner_image TEXT,
    primary_video TEXT,
    sharing_image_id UUID REFERENCES images(id),
    brand_color TEXT,
    light_brand BOOLEAN DEFAULT false,
    website TEXT,
    short_description TEXT,
    offering_entity_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
    is_public BOOLEAN DEFAULT false,
    waitlist_on BOOLEAN DEFAULT false,
    access_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Details table
CREATE TABLE offering_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offering_id UUID NOT NULL REFERENCES offerings(id) ON DELETE CASCADE,
    custom_onboarding_link TEXT,
    type offering_details_type,
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
    cap_rate INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Description Text table
CREATE TABLE offering_description_texts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section offering_tab_section NOT NULL,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    offering_id UUID NOT NULL REFERENCES offerings(id) ON DELETE CASCADE,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Smart Contract Sets table
CREATE TABLE offering_smart_contract_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offering_id UUID NOT NULL REFERENCES offerings(id) ON DELETE CASCADE,
    share_contract_id UUID REFERENCES smart_contracts(id),
    swap_contract_id UUID REFERENCES smart_contracts(id),
    distribution_contract_id UUID REFERENCES smart_contracts(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Offering Participants table
CREATE TABLE offering_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address_offering_id TEXT UNIQUE NOT NULL,
    wallet_address TEXT NOT NULL,
    email_address TEXT,
    chain_id INTEGER NOT NULL,
    name TEXT,
    offering_id UUID NOT NULL REFERENCES offerings(id) ON DELETE CASCADE,
    min_pledge INTEGER,
    max_pledge INTEGER,
    jurisdiction_id UUID REFERENCES jurisdictions(id),
    paid BOOLEAN DEFAULT false,
    external_id TEXT,
    last_update TIMESTAMPTZ DEFAULT NOW(),
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Whitelist Transactions table
CREATE TABLE whitelist_transactions (
    transaction_hash TEXT PRIMARY KEY,
    offering_participant_id UUID NOT NULL REFERENCES offering_participants(id) ON DELETE CASCADE,
    type whitelist_transaction_type NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Investor Applications table
CREATE TABLE investor_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    offering_participant_id UUID NOT NULL REFERENCES offering_participants(id) ON DELETE CASCADE,
    application_doc_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real Estate Properties table
CREATE TABLE real_estate_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_type real_estate_property_type NOT NULL,
    investment_status asset_status,
    address_id UUID REFERENCES addresses(id),
    amenities_description TEXT,
    description TEXT,
    loan INTEGER,
    down_payment INTEGER,
    asset_value INTEGER,
    asset_value_note TEXT,
    lender_fees INTEGER,
    closing_costs INTEGER,
    owner_id UUID NOT NULL REFERENCES legal_entities(id) ON DELETE CASCADE,
    creation_date TIMESTAMPTZ DEFAULT NOW(),
    last_update TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real Estate Property Images junction table
CREATE TABLE real_estate_property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES real_estate_properties(id) ON DELETE CASCADE,
    image_id UUID NOT NULL REFERENCES images(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(property_id, image_id)
);

-- Notification Configurations table
CREATE TABLE notification_configurations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    notification_recipient_type notification_recipient_type NOT NULL,
    notification_method notification_method NOT NULL,
    notification_subject notification_subject NOT NULL,
    organization_user_id UUID NOT NULL REFERENCES organization_users(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Share Transfer Events table (Independent Chain Data)
CREATE TABLE share_transfer_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE TABLE share_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE TABLE offering_distributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
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
CREATE INDEX idx_profiles_creation_date ON profiles(creation_date);

-- Organizations indexes
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_name_gin ON organizations USING gin(to_tsvector('english', name));
CREATE INDEX idx_organizations_is_public ON organizations(is_public);

-- Organization Users indexes
CREATE INDEX idx_organization_users_org_id ON organization_users(organization_id);
CREATE INDEX idx_organization_users_user_id ON organization_users(user_id);
CREATE INDEX idx_organization_users_permissions ON organization_users USING gin(permissions);

-- Legal Entities indexes
CREATE INDEX idx_legal_entities_org_id ON legal_entities(organization_id);
CREATE INDEX idx_legal_entities_display_name_gin ON legal_entities USING gin(to_tsvector('english', display_name));
CREATE INDEX idx_legal_entities_legal_name_gin ON legal_entities USING gin(to_tsvector('english', legal_name));
CREATE INDEX idx_legal_entities_type ON legal_entities(type);

-- Addresses indexes
CREATE INDEX idx_addresses_legal_entity_id ON addresses(legal_entity_id);
CREATE INDEX idx_addresses_city ON addresses(city);
CREATE INDEX idx_addresses_country ON addresses(country);

-- Email Addresses indexes
CREATE INDEX idx_email_addresses_org_id ON email_addresses(organization_id);
CREATE INDEX idx_email_addresses_address ON email_addresses(address);
CREATE INDEX idx_email_addresses_is_public ON email_addresses(is_public);

-- Linked Accounts indexes
CREATE INDEX idx_linked_accounts_org_id ON linked_accounts(organization_id);
CREATE INDEX idx_linked_accounts_username ON linked_accounts(username);
CREATE INDEX idx_linked_accounts_type ON linked_accounts(type);

-- Documents indexes
CREATE INDEX idx_documents_owner_id ON documents(owner_id);
CREATE INDEX idx_documents_offering_id ON documents(offering_id);
CREATE INDEX idx_documents_offering_unique_id ON documents(offering_unique_id);
CREATE INDEX idx_documents_file_id ON documents(file_id);
CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_documents_format ON documents(format);

-- Document Signatories indexes
CREATE INDEX idx_document_signatories_document_id ON document_signatories(document_id);
CREATE INDEX idx_document_signatories_legal_entity_id ON document_signatories(legal_entity_id);

-- Crypto Addresses indexes
CREATE INDEX idx_crypto_addresses_legal_entity_id ON crypto_addresses(legal_entity_id);
CREATE INDEX idx_crypto_addresses_address ON crypto_addresses(address);
CREATE INDEX idx_crypto_addresses_protocol ON crypto_addresses(protocol);
CREATE INDEX idx_crypto_addresses_type ON crypto_addresses(type);
CREATE INDEX idx_crypto_addresses_is_public ON crypto_addresses(is_public);

-- Smart Contracts indexes
CREATE INDEX idx_smart_contracts_crypto_address_id ON smart_contracts(crypto_address_id);
CREATE INDEX idx_smart_contracts_owner_id ON smart_contracts(owner_id);
CREATE INDEX idx_smart_contracts_type ON smart_contracts(type);

-- Offerings indexes
CREATE INDEX idx_offerings_offering_entity_id ON offerings(offering_entity_id);
CREATE INDEX idx_offerings_name_gin ON offerings USING gin(to_tsvector('english', name));
CREATE INDEX idx_offerings_is_public ON offerings(is_public);
CREATE INDEX idx_offerings_creation_date ON offerings(creation_date);

-- Offering Details indexes
CREATE INDEX idx_offering_details_offering_id ON offering_details(offering_id);
CREATE INDEX idx_offering_details_type ON offering_details(type);
CREATE INDEX idx_offering_details_stage ON offering_details(stage);

-- Offering Description Texts indexes
CREATE INDEX idx_offering_description_texts_offering_id ON offering_description_texts(offering_id);
CREATE INDEX idx_offering_description_texts_section ON offering_description_texts(section);
CREATE INDEX idx_offering_description_texts_order ON offering_description_texts("order");

-- Offering Smart Contract Sets indexes
CREATE INDEX idx_offering_smart_contract_sets_offering_id ON offering_smart_contract_sets(offering_id);

-- Offering Participants indexes
CREATE INDEX idx_offering_participants_offering_id ON offering_participants(offering_id);
CREATE INDEX idx_offering_participants_wallet_address_gin ON offering_participants USING gin(to_tsvector('english', wallet_address));
CREATE INDEX idx_offering_participants_address_offering_id ON offering_participants(address_offering_id);
CREATE INDEX idx_offering_participants_email_address ON offering_participants(email_address);

-- Whitelist Transactions indexes
CREATE INDEX idx_whitelist_transactions_offering_participant_id ON whitelist_transactions(offering_participant_id);
CREATE INDEX idx_whitelist_transactions_type ON whitelist_transactions(type);

-- Investor Applications indexes
CREATE INDEX idx_investor_applications_offering_participant_id ON investor_applications(offering_participant_id);
CREATE INDEX idx_investor_applications_application_doc_id ON investor_applications(application_doc_id);

-- Real Estate Properties indexes
CREATE INDEX idx_real_estate_properties_owner_id ON real_estate_properties(owner_id);
CREATE INDEX idx_real_estate_properties_property_type ON real_estate_properties(property_type);
CREATE INDEX idx_real_estate_properties_investment_status ON real_estate_properties(investment_status);

-- Share Transfer Events indexes
CREATE INDEX idx_share_transfer_events_share_contract_address ON share_transfer_events(share_contract_address);
CREATE INDEX idx_share_transfer_events_recipient_address ON share_transfer_events(recipient_address);
CREATE INDEX idx_share_transfer_events_sender_address ON share_transfer_events(sender_address);
CREATE INDEX idx_share_transfer_events_partition ON share_transfer_events(partition);
CREATE INDEX idx_share_transfer_events_type ON share_transfer_events(type);

-- Share Orders indexes
CREATE INDEX idx_share_orders_swap_contract_address ON share_orders(swap_contract_address);
CREATE INDEX idx_share_orders_initiator ON share_orders(initiator);
CREATE INDEX idx_share_orders_visible ON share_orders(visible);

-- Note: Supabase Auth manages its own indexes for auth.users, auth.sessions, etc.

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_entity_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE linked_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_signatories ENABLE ROW LEVEL SECURITY;
ALTER TABLE crypto_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_description_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_smart_contract_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE whitelist_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE investor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_transfer_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE share_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE offering_distributions ENABLE ROW LEVEL SECURITY;
-- Note: Supabase Auth tables (auth.users, auth.sessions, etc.) have their own RLS policies

-- Basic RLS policies (users can access their own data and organization data they belong to)
-- Note: These are basic policies. You'll need to implement more sophisticated authorization
-- based on your specific business logic and the complex auth rules from the Dgraph schema.

-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Organization members can view organization data
CREATE POLICY "Organization members can view organization" ON organizations
    FOR SELECT USING (
        id IN (
            SELECT organization_id 
            FROM organization_users 
            WHERE user_id = auth.uid()
        )
    );

-- Organization admins can update organization
CREATE POLICY "Organization admins can update organization" ON organizations
    FOR UPDATE USING (
        id IN (
            SELECT organization_id 
            FROM organization_users 
            WHERE user_id = auth.uid() 
            AND 'ADMIN' = ANY(permissions)
        )
    );

-- Organization members can view organization users
CREATE POLICY "Organization members can view organization users" ON organization_users
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id 
            FROM organization_users 
            WHERE user_id = auth.uid()
        )
    );

-- Organization admins can manage organization users
CREATE POLICY "Organization admins can manage organization users" ON organization_users
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id 
            FROM organization_users 
            WHERE user_id = auth.uid() 
            AND 'ADMIN' = ANY(permissions)
        )
    );

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
    INSERT INTO public.profiles (id, name, image)
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
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_organization_users_updated_at BEFORE UPDATE ON organization_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_legal_entities_updated_at BEFORE UPDATE ON legal_entities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_email_addresses_updated_at BEFORE UPDATE ON email_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_linked_accounts_updated_at BEFORE UPDATE ON linked_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_images_updated_at BEFORE UPDATE ON images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_document_signatories_updated_at BEFORE UPDATE ON document_signatories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crypto_addresses_updated_at BEFORE UPDATE ON crypto_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_smart_contracts_updated_at BEFORE UPDATE ON smart_contracts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offerings_updated_at BEFORE UPDATE ON offerings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_details_updated_at BEFORE UPDATE ON offering_details FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_description_texts_updated_at BEFORE UPDATE ON offering_description_texts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_smart_contract_sets_updated_at BEFORE UPDATE ON offering_smart_contract_sets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_participants_updated_at BEFORE UPDATE ON offering_participants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_whitelist_transactions_updated_at BEFORE UPDATE ON whitelist_transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investor_applications_updated_at BEFORE UPDATE ON investor_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_real_estate_properties_updated_at BEFORE UPDATE ON real_estate_properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_configurations_updated_at BEFORE UPDATE ON notification_configurations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_share_transfer_events_updated_at BEFORE UPDATE ON share_transfer_events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_share_orders_updated_at BEFORE UPDATE ON share_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_offering_distributions_updated_at BEFORE UPDATE ON offering_distributions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- Note: Supabase Auth tables don't need updated_at triggers as they're managed by Supabase

-- ============================================================================
-- COMMENTS
-- ============================================================================

-- Add comments to tables for documentation
COMMENT ON TABLE profiles IS 'User profiles extending Supabase Auth users with additional data';
COMMENT ON TABLE organizations IS 'Organizations that manage offerings and legal entities';
COMMENT ON TABLE legal_entities IS 'Legal entities (individuals, corporations, LLCs) that can own offerings';
COMMENT ON TABLE offerings IS 'Investment offerings managed by legal entities';
COMMENT ON TABLE offering_participants IS 'Investors participating in offerings';
COMMENT ON TABLE documents IS 'Documents associated with offerings and legal entities';
COMMENT ON TABLE smart_contracts IS 'Blockchain smart contracts for offerings';
COMMENT ON TABLE share_transfer_events IS 'Blockchain events for share transfers (independent chain data)';
COMMENT ON TABLE share_orders IS 'Share trading orders (independent chain data)';

-- Migration completed successfully
-- This migration creates a complete PostgreSQL schema equivalent to the Dgraph schema
-- with proper relationships, indexes, and basic Row Level Security policies.
