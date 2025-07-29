<?php
namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class MasterPositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'Ketua',
            ],
            [
                'title' => 'Wakil Ketua',
            ],
        ];

        DB::table('master_positions')->insertOrIgnore($data);
    }
}
