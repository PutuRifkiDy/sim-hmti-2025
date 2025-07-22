<?php
namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nim'      => '2305551068',
                'password' => bcrypt('2305551068'),
            ],
            [
                'nim'      => '2305551065',
                'password' => bcrypt('2305551065'),
            ],
            [
                'nim'      => '2305551061',
                'password' => bcrypt('2305551061'),
            ],
            [
                'nim'      => '2305551062',
                'password' => bcrypt('2305551062'),
            ],
            [
                'nim'      => '2305551063',
                'password' => bcrypt('2305551063'),
            ],
        ];

        DB::table('users')->insertOrIgnore($data);
    }
}
