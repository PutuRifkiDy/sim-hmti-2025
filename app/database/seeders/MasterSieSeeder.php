<?php
namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class MasterSieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'sie_name' => 'Perlengkapan',
            ],
            [
                'sie_name' => 'Keamanan',
            ],
        ];

        DB::table('master_sies')->insertOrIgnore($data);
    }
}
