import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://vmotnlgheysvvnpmklsm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZtb3RubGdoZXlzdnZucG1rbHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYxMTkwMTYsImV4cCI6MTk5MTY5NTAxNn0.XIUboQfI_86PvrWlGh63wvDP17kyVoq_HnKv8HQC-ek')

import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter webhook url:  ', async (webhook) => {
  console.log("log > Setting webhook...")
  console.log("log > Setting id...")
  const id = Math.floor(100000000 + Math.random() * 900000000);
  console.log("log > Uploading to db...")

  const { error } = await supabase
    .from('users')
    .insert({ id: id, webhook: webhook })
  console.log(`log > Completed your new webhook is <your-domain>/${id}`)
  rl.close();
});
