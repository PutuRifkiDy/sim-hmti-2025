<?php
namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            MasterSieSeeder::class,
            MasterPeriodSeeder::class,
            MasterPositionSeeder::class,
            HimpunanSeeder::class,
            MasterProgramKerjaSeeder::class,
            MasterFinancialSeeder::class,
        ]);

        User::create([
            "nim"      => "2305551068",
            "password" => bcrypt("2305551068"),
        ])->assignRole('divisi_it');
    }
}
