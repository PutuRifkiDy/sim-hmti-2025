<?php
namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Traits\HasFile;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    use HasFile;
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status'          => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // $request->user()->fill($request->validated());

        // if ($request->user()->isDirty('email')) {
        //     $request->user()->email_verified_at = null;
        // }

        // $request->user()->save();

        $user = $request->user();

        $user->fill($request->validated());

        $imgPath = $request->hasFile('img_path')
        ? $this->update_file($request, $user, 'img_path', 'user/foto_profile')
        : ($user->img_path ?? null);

        if ($imgPath) {
            $user->img_path = $imgPath;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->already_filled = true;

        if ($user->save()) {
            flashMessage('Profil anda berhasil diperbarui.', 'success');
        } else {
            flashMessage('Profil anda gagal diperbarui.', 'danger');
        }

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        flashMessage('Akun anda berhasil dihapus.', 'success');

        return Redirect::to('/');
    }
}
