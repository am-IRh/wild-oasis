import { createClient } from "@supabase/supabase-js";

//! This important without this, project not working
// 1) Create an account in supabase.com
// 2) Copy your supabase -url- and -Key-
// - For find your Key open api Docs and select bash requests
export const supabaseUrl = "";
const supabaseKey = "";

if (!supabaseUrl || !supabaseKey) throw new Error("read service/supabase.ts comments");
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
