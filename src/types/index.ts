type ServiceRequestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'; // Add other statuses as needed

interface ServiceRequest {
  id: number;
  client_id: number;
  freelancer_id?: number | null;
  service_id: number;
  request_number: string;
  description: string;
  requirements?: object | null;
  attachments?: object | null;
  service_location_type: 'client_location' | 'freelancer_location' | 'other';
  wilaya: string;
  address: string;
  latitude?: number | null;
  longitude?: number | null;
  location_details?: object | null;
  preferred_start_date: string; // DateTime in string format
  preferred_end_date?: string | null;
  alternative_dates?: object | null;
  time_flexibility: 'strict' | 'flexible' | 'very_flexible';
  schedule_details?: object | null;
  service_price: number;
  travel_fee: number;
  additional_charges: number;
  total_amount: number;
  currency: string; // 'DZD'
  price_breakdown?: object | null;
  visit_fee: number;
  visit_fee_included: boolean;
  status: ServiceRequestStatus;
  started_at?: string | null;
  completed_at?: string | null;
  completion_proof?: object | null;
  service_notes?: object | null;
  quality_checklist?: object | null;
  client_confirmed: boolean;
  freelancer_confirmed: boolean;
  communication_history?: object | null;
  status_updates?: object | null;
  cancellation_reason?: string | null;
  cancelled_by?: string | null;
  dispute_details?: object | null;
  resolution_details?: object | null;
  dispute_status?: 'open' | 'under_review' | 'resolved' | null;
  is_emergency: boolean;
  emergency_details?: string | null;
  emergency_request_at?: string | null;
  metadata?: object | null;
  created_at: string; // DateTime in string format
  updated_at: string; // DateTime in string format
  deleted_at?: string | null; // DateTime in string format (for soft delete)
}

// Enums
enum ServiceRequestStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

enum PaymentType {
  FIXED = "fixed",
  HOURLY = "hourly",
}

enum ServiceStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

enum CurrencyCode {
  DZD = "DZD",
  USD = "USD",
  EUR = "EUR",
}

// Types for service_requests table
interface ServiceRequest {
  id: number;
  client_id: number;
  freelancer_id: number | null;
  service_id: number;
  request_number: string;
  description: string;
  requirements: object | null;
  attachments: object | null;
  service_location_type: "client_location" | "freelancer_location" | "other";
  wilaya: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  location_details: object | null;
  preferred_start_date: string; // datetime string
  preferred_end_date: string | null; // datetime string
  alternative_dates: object | null;
  time_flexibility: "strict" | "flexible" | "very_flexible";
  schedule_details: object | null;
  service_price: number;
  travel_fee: number;
  additional_charges: number;
  total_amount: number;
  currency: "DZD" | "USD" | "EUR"; // or use CurrencyCode enum
  price_breakdown: object | null;
  visit_fee: number;
  visit_fee_included: boolean;
  status: ServiceRequestStatus;
  started_at: string | null; // datetime string
  completed_at: string | null; // datetime string
  completion_proof: object | null;
  service_notes: object | null;
  quality_checklist: object | null;
  client_confirmed: boolean;
  freelancer_confirmed: boolean;
  communication_history: object | null;
  status_updates: object | null;
  cancellation_reason: string | null;
  cancelled_by: string | null;
  dispute_details: object | null;
  resolution_details: object | null;
  dispute_status: "open" | "under_review" | "resolved" | null;
  is_emergency: boolean;
  emergency_details: string | null;
  emergency_request_at: string | null; // timestamp string
  metadata: object | null;
  created_at: string; // timestamp string
  updated_at: string; // timestamp string
  deleted_at: string | null; // timestamp string
}

// Types for service_categories table
interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  parent_id: number | null;
  status: ServiceStatus;
  icon: string | null;
  image: string | null;
  banner_image: string | null;
  featured: boolean;
  display_order: number;
  services_count: number;
  active_services_count: number;
  freelancers_count: number;
  average_service_price: number | null;
  created_at: string; // timestamp string
  updated_at: string; // timestamp string
  deleted_at: string | null; // timestamp string
}


// Types for client_category_preferences pivot table
interface ClientCategoryPreference {
  id: number;
  client_id: number;
  category_id: number;
  budget_min: number | null;
  budget_max: number | null;
  specific_requirements: string | null;
  created_at: string; // timestamp string
  updated_at: string; // timestamp string
}

// Types for services table
interface Service {
  id: number;
  freelancer_id: number;
  category_id: number;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  price: number;
  currency: CurrencyCode; // or use CurrencyCode enum
  price_unit: string | null;
  minimum_price: number | null;
  maximum_price: number | null;
  price_tiers: object | null;
  custom_pricing_enabled: boolean;
  visit_fee: number | null;
  visit_fee_included: boolean;
  pricing_type: PaymentType; // or use PaymentType enum
  features: object | null;
  requirements: object | null;
  deliverables: object | null;
  service_type: "onsite" | "remote" | "hybrid";
  experience_level: string | null;
  tools_and_equipment: object | null;
  cancellation_policy: string | null;
  availability: object | null;
  response_time_hours: number | null;
  status: ServiceStatus;
  service_areas: object | null;
  travel_fee_per_km: number | null;
  max_travel_distance: number | null;
  insurance_required: boolean;
  insurance_details: string | null;
  warranty_information: string | null;
  warranty_duration_days: number | null;
  quality_guarantees: object | null;
  images: object | null;
  videos: object | null;
  documents: object | null;
  views_count: number;
  bookings_count: number;
  completed_jobs_count: number;
  average_rating: number | null;
  reviews_count: number;
  completion_rate: number | null;
  last_booked_at: string | null; // timestamp string
  verified_at: string | null; // timestamp string
  admin_notes: string | null;
  created_at: string; // timestamp string
  updated_at: string; // timestamp string
  deleted_at: string | null; // timestamp string
}


// Enum Types
enum UserStatus {
    ACTIVE = 'active',
    PENDING = 'pending',
    SUSPENDED = 'suspended',
    BANNED = 'banned',
    INACTIVE = 'inactive',
}

enum VerificationStatus {
    UNVERIFIED = 'unverified',
    PENDING = 'pending',
    VERIFIED = 'verified',
    REJECTED = 'rejected',
}

type User = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    password: string;
    profile_photo_path: string | null;
    auth_type: 'email' | 'phone' | 'google' | 'facebook' | 'apple';
    social_auth_data: object | null;
    remember_token: string;
    date_of_birth: string | null;
    gender: 'male' | 'female' | null;
    locale: 'ar' | 'en' | 'fr';
    primary_wilaya: string | null;
    primary_address: string | null;
    primary_latitude: number | null;
    primary_longitude: number | null;
    status: UserStatus;
    banned_at: string | null;
    last_login_at: string | null;
    last_login_ip: string | null;
    referred_by: number | null;
    referral_code: string | null;
    notifications_preferences: object | null;
    email_verification_status: VerificationStatus;
    phone_verification_status: VerificationStatus;
    identity_verification_status: VerificationStatus;
    email_verified_at: string | null;
    phone_verified_at: string | null;
    identity_verified_at: string | null;
    platform_points: number;
    achievement_badges: object | null;
    last_active_at: string | null;
    last_known_ip: string | null;
    last_known_device: string | null;
    timezone: string;
    privacy_settings: object | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

type ClientProfile = {
    id: number;
    user_id: number;
    
    // Basic Profile
    profile_visibility: 'public' | 'private';
    bio: string | null;
    cover_photo: string | null;
    
    // Business Information
    is_business: boolean;
    business_name: string | null;
    business_type: string | null;
    tax_id: string | null;
    business_documents: object | null;
    business_hours: object | null;
    verified_business: boolean;
    
    // Service Preferences
    preferred_service_types: object | null;
    preferred_service_areas: object | null;
    service_requirements: object | null;
    preferred_pricing_types: object | null;
    preferred_currency: string;
    
    // Location & Service Areas
    service_locations: object | null;
    default_addresses: object | null;
    primary_wilaya: string | null;
    service_location_preferences: object | null;
    
    // Emergency Services
    emergency_services_enabled: boolean;
    emergency_contacts: object | null;
    emergency_service_preferences: object | null;
    emergency_requests_made: number;
    
    // Verification & Trust
    verification_level: 'unverified' | 'basic_verified' | 'identity_verified' | 'business_verified';
    verification_documents: object | null;
    background_checked: boolean;
    verified_at: string | null;
    
    // Service History
    total_requests: number;
    completed_requests: number;
    cancelled_requests: number;
    ongoing_requests: number;
    completion_rate: number;
    average_rating_given: number | null;
    average_rating_received: number | null;
    total_spent: number;
    
    // Engagement Metrics
    response_time: number;
    response_rate: number;
    disputes_opened: number;
    disputes_resolved: number;
    dispute_resolution_rate: number;
    
    // Payment & Billing
    payment_methods: object | null;
    billing_addresses: object | null;
    invoice_preferences: object | null;
    auto_pay_enabled: boolean;
    
    // Communication Preferences
    preferred_contact_methods: object | null;
    notification_settings: object | null;
    communication_preferences: object | null;
    instant_messaging_enabled: boolean;
    
    // Freelancer Relationships
    preferred_freelancers: object | null;
    blocked_freelancers: object | null;
    saved_freelancers: object | null;
    favorite_services: object | null;
    
    // Profile Completion
    completion_checklist: object | null;
    profile_completion_percentage: number;
    required_fields: object | null;
    optional_fields: object | null;
    last_profile_update: string | null;
    profile_reviewed: boolean;
    profile_reviewed_at: string | null;
    
    // Platform Engagement
    last_active_at: string | null;
    last_request_at: string | null;
    saved_searches: object | null;
    profile_views: number;
    search_appearances: number;
    
    // System Fields
    metadata: object | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
};

type FreelancerProfile = {
  id: number;
  user_id: number;

  // Professional Information
  title?: string;
  summary?: string;
  profile_visibility: 'public' | 'private';
  cover_photo?: string;
  experience_level?: string;

  // Service Categories & Skills
  skills?: string[];
  languages?: string[];
  tags?: string[];

  // Service Delivery
  service_type: 'onsite' | 'remote' | 'hybrid';
  service_areas?: string[];
  travel_fee_policy?: any; // Replace with appropriate type
  location_requirements?: any; // Replace with appropriate type

  // Pricing & Fees
  pricing_type: 'fixed' | 'hourly' | 'daily' | 'square_meter' | 'linear_meter' | 'visit' | 'project_based' | 'package' | 'custom';
  minimum_price?: number;
  maximum_price?: number;
  visit_fee?: number;
  visit_fee_included: 'yes' | 'no';
  price_tiers?: any; // Replace with appropriate type
  custom_pricing_enabled: boolean;
  price_currency: string;

  // Timing and Scheduling
  availability?: any; // Replace with appropriate type
  lead_time?: number;
  completion_time?: number;
  time_unit: 'days' | 'hours'; // Adjust as needed
  scheduling_type: 'flexible' | 'fixed';
  booking_window?: number;
  availability_status: 'available' | 'busy' | 'on_vacation' | 'not_accepting_jobs';

  // Qualifications & Portfolio
  certifications?: any; // Replace with appropriate type
  education?: any; // Replace with appropriate type
  experience?: any; // Replace with appropriate type
  portfolio_items?: any; // Replace with appropriate type
  achievements?: any; // Replace with appropriate type

  // Equipment & Resources
  tools_and_equipment?: any; // Replace with appropriate type
  insurance_info?: any; // Replace with appropriate type
  service_guarantees?: any; // Replace with appropriate type

  // Business Information
  has_business_license: boolean;
  business_name?: string;
  tax_id?: string;
  accepts_company_contracts: boolean;

  // Policies
  cancellation_policy?: any; // Replace with appropriate type
  refund_policy?: any; // Replace with appropriate type
  terms_conditions?: any; // Replace with appropriate type
  warranty_info?: any; // Replace with appropriate type

  // Verification & Trust
  verification_level: 'unverified' | 'basic_verified' | 'identity_verified' | 'professional_verified' | 'expert_verified';
  verification_documents?: any; // Replace with appropriate type
  background_checked: boolean;
  verified_at?: Date;

  // Performance Metrics
  total_jobs: number;
  completed_jobs: number;
  cancelled_jobs: number;
  ongoing_jobs: number;
  completion_rate: number;
  response_rate: number;
  response_time: number;
  total_earnings: number;
  emergency_requests_completed: number;
  quality_score?: number;
  quality_metrics?: any; // Replace with appropriate type
  repeat_client_rate?: number;

  // Profile Stats
  profile_views: number;
  total_services: number;
  active_services: number;
  search_appearances: number;
  favorites_count: number;

  // Profile Completion
  completion_checklist?: any; // Replace with appropriate type
  profile_completion_percentage: number;
  required_fields?: any; // Replace with appropriate type
  optional_fields?: any; // Replace with appropriate type
  last_profile_update?: Date;
  profile_reviewed: boolean;
  profile_reviewed_at?: Date;
  completion_rewards?: any; // Replace with appropriate type
  featured_eligible: boolean;
  featured: boolean;

  // Client Relationships
  repeat_clients?: any; // Replace with appropriate type
  preferred_clients?: any; // Replace with appropriate type
  blocked_clients?: any; // Replace with appropriate type

  // Platform Engagement
  last_active_at?: Date;
  last_job_at?: Date;
  saved_searches?: any; // Replace with appropriate type
  notification_settings?: any; // Replace with appropriate type
  instant_booking_enabled: boolean;

  // System Fields
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
};
