<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterProgramKerjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title'        => 'Penyelenggaraan',
                'description'  => 'Penyelenggaraan',
                'img_path'     => null,
                'period_id'    => 4
            ],
        ];

        DB::table('master_program_kerjas')->insertOrIgnore($data);
    }
}
