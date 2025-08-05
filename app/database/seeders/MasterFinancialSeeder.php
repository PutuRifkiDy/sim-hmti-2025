<?php
namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class MasterFinancialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title'        => 'Pemasukkan bulan januari',
                'month'        => 'Januari',
                'total_income' => 1000000,
                'period_id'    => 1,
            ],
            [
                'title'        => 'Pemasukkan bulan Februari',
                'month'        => 'Feburari',
                'total_income' => 1000000,
                'period_id'    => 1,
            ],
        ];

        DB::table('master_financials')->insertOrIgnore($data);
    }
}
