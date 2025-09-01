import { NextResponse } from 'next/server';
import { getPool } from '../db/lib';

export async function GET() {
  try {
    const pool = await getPool();
    // Replace 'StoredProcedureName' with your actual stored procedure
    const result = await pool.request().execute('StoredProcedureName');
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
