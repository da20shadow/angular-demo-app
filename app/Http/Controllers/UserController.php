<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $profile = User::where('id',$user_id)->first();
        }catch (QueryException $exception) {
            return response()->json([
                'message' => 'Invalid Request',
                'error' => $exception->getMessage(),
            ]);
        }

        return response()->json([
            'username' => $profile['username'],
            'email' => $profile['email'],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'username' => ['required','string','min:3','max:45','unique:users,username'],
            'email' => ['required','unique:users,email','email'],
            'password' => ['required','min:8','max:75','string','confirmed'],
        ]);

        try {
            $user = User::create([
                'username' => $fields['username'],
                'email' => $fields['email'],
                'password' => bcrypt($fields['password']),
            ]);
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'Invalid request!',
                'error' => $exception->getMessage()
            ],401);
        }

        $token = $user->createToken('laravelGoalsAppAccessToken')->plainTextToken;

        $user['token'] = $token;

        return response()->json($user,201);
    }

    public function login(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'email' => ['required','email'],
            'password' => ['required','min:8','string'],
        ]);
        //Check Email
        $user = User::where('email',$fields['email'])->first();
        //Check password
        if (!$user || !Hash::check($fields['password'],$user->password)) {
            return response()->json(['message'=>'Bad credentials!'],401);
        }

        $token = $user->createToken('laravelGoalsAppAccessToken')->plainTextToken;
        $user['token'] = $token;
        return response()->json($user,201);
    }

    public function logout(): JsonResponse
    {
        auth()->user()->tokens()->delete();
        return response()->json(['user' => 'Successfully logged out']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        try {
            $publicProfile = DB::table('users')
                ->select('username')
                ->where(['id' => $id])->get()->first();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'User not exist!',
                'error' => $exception->getMessage()
            ],401);
        }

        return response()->json([
            'username' => $publicProfile['username']
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $fields = $request->all();

        if (isset($fields['new_email'])){
            $inputEmail = $request->validate(['new_email' => ['unique:users,email','email']]);
            try {
                User::where('id',$user_id)
                    ->update(['email' => $inputEmail['email']]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'Invalid Request!',
                    'error' => $exception->getMessage()
                ],401);
            }
            return response()->json(['message' => 'Successfully updated email!']);
        }

        if (isset($fields['new_password'])){
            $inputPassword = $request->validate(['new_password' => ['min:8','max:75','string','confirmed']]);

            try {
                User::where('id',$user_id)
                    ->update(['password' => bcrypt($inputPassword['new_password'])]);
            }catch (QueryException $exception){
                return response()->json([
                    'message' => 'Invalid Request!',
                    'error' => $exception->getMessage()
                ],401);
            }

            return response()->json(['message' => 'Successfully updated password!']);
        }

        return response()->json(['message' => 'An error occur! Please, try again!']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return JsonResponse
     */
    public function destroy(): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            User::where('id',$user_id)
                ->delete();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'Invalid Request!',
                'error' => $exception->getMessage()
            ],401);
        }

        return response()->json(['message' => 'Successfully Deleted Account!']);
    }
}
