import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_ANON_KEY: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_ANON_KEY)

def executeCRUDOperations():
    # Select Data
    data = supabase.table("notes").select("*").execute()
    print(data)
    # Assert we pulled real data.
    assert len(data.data) > 0

    # Insert Data
    data = supabase.table("notes").insert({"title":"Testing insert data"}).execute()
    data = supabase.table("notes").insert({"title":"Testing update data"}).execute()
    # Assert we pulled real data.
    assert len(data.data) > 0

    # Update Data
    data = supabase.table("notes").update({"title":"Testing insert / update data"}).eq("id", 6).execute()

    # Delete Data
    data = supabase.table("notes").delete().eq("id", 6).execute()



if __name__ == "__main__":
    executeCRUDOperations()