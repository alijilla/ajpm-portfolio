const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://mgmseglmmwfconijocmc.supabase.co";
const supabaseKey = "sb_publishable_HusL_kga6nQVbxN_KdHASg_24GgdePX";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data, error } = await supabase.from("skills").select("*");
  console.log("Data:", data);
  console.log("Error:", error);
}

test();
