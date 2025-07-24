<?php
namespace Database\Seeders;

use Carbon\Carbon;
use DB;
use Illuminate\Database\Seeder;

class MasterPeriodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title'      => 'Kabinet Harmoni',
                'start_date' => Carbon::now(),
                'end_date'   => Carbon::now()->addMonth(),
            ],
            [
                'title'      => 'Kabinet Indonesia Berdampak',
                'start_date' => Carbon::now(),
                'end_date'   => Carbon::now()->addMonth(),
            ],
        ];

        DB::table('master_periods')->insertOrIgnore($data);
    }
}
