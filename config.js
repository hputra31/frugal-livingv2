// Supabase Configuration - REPLACE WITH YOUR CREDENTIALS
const SUPABASE_URL = 'https://fyjwyfytdprdkpmduoxt.supabase.co'; // ❗ PASTE YOUR SUPABASE URL HERE
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5and5Znl0ZHByZGtwbWR1b3h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMjk1MTgsImV4cCI6MjA3MzcwNTUxOH0.DwIF3vCAt4-acGt3nfd7-KjZodzcxPM867u14XBlKJE'; // ❗ PASTE YOUR SUPABASE ANON KEY HERE

// Initialize Supabase client
let supabase = null;
let useSupabase = false;

// Check if Supabase credentials are configured
if (SUPABASE_URL && !SUPABASE_URL.includes('YOUR_SUPABASE_URL') && SUPABASE_ANON_KEY && !SUPABASE_ANON_KEY.includes('YOUR_SUPABASE_ANON_KEY')) {
    try {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        useSupabase = true;
        console.log('✅ Supabase initialized successfully from config.js');
    } catch (error) {
        console.error('❌ Supabase initialization failed:', error);
    }
} else {
    console.warn('❌ Supabase not configured. Please add credentials to config.js');
}
