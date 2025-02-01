import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nrszbddurwfjgeezlrmk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yc3piZGR1cndmamdlZXpscm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxNDA0MTIsImV4cCI6MjA1MjcxNjQxMn0.cfeasOCBJQlwB7in1Zua7LoHiK84PsjAqWNB3xyFdr4";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
