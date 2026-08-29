const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://mgmseglmmwfconijocmc.supabase.co";
const supabaseKey = "sb_publishable_HusL_kga6nQVbxN_KdHASg_24GgdePX";

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const exp = await supabase.from("experiences").select("*");
  console.log("Experiences Data:", exp.data);
  
  const certs = await supabase.from("certifications").select("*");
  console.log("Certifications Data:", certs.data);
}

test();
