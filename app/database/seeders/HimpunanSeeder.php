<?php
namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class HimpunanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'user_id'     => 1,
                'position_id' => 1,
                'period_id'   => 1,
            ],
            [
                'user_id'     => 1,
                'position_id' => 2,
                'period_id'   => 1,
            ],
            [
                'user_id'     => 2,
                'position_id' => 2,
                'period_id'   => 1,
            ],
            [
                'user_id'     => 3,
                'position_id' => 2,
                'period_id'   => 1,
            ],
        ];

        DB::table('himpunans')->insertOrIgnore($data);
    }
}
