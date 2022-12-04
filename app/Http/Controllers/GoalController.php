<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GoalController extends Controller
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
            $goalsList = DB::table('goals')
                ->select('*')
                ->where(['user_id' => $user_id])
                ->where(['completed' => false])
                ->get();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!']);
            //TODO: log the error!
        }

        if (count($goalsList) < 1){
            return response()->json(['message' => 'No Goals Yet!']);
        }
        return response()->json($goalsList);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $fields = $request->validate([
            'title' => ['required','string'],
            'description' => ['string'],
            'due_date' => ['date'],
            'category' => ['Integer']
        ]);

        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $goalExist = Goal::where('user_id',$user_id)
                ->where('title',$fields['title'])->first();
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ],401);

            //TODO: log the error!
        }

        if ($goalExist !== null) {
            return response()->json(['message' => 'Goal with the same title already added!'],400);
        }

        try {
            $fields['user_id'] = $user_id;
            Goal::create($fields);
        }catch (QueryException $exception){
            return response()->json([
                'message' => 'An Error Occur! Please, try again!',
                'error' => $exception->getMessage()
            ],401);
            //TODO: log the error!
        }

        return response()->json([
            'message' => 'Successfully added new goal!',
            'goal' => $fields,
        ],201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $goal = Goal::where('user_id',$user_id)
                ->where('id',$id)
                ->first();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!']);
            //TODO: log the error!
        }

        if (!$goal){
            return response()->json(['message' => 'No goal with ID']);
        }

        try {
            $goalTasks = DB::table('tasks')
                ->where(['goal_id' => $id])
                ->where(['user_id' => $user_id])
                ->get();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!']);
            //TODO: log the error!
        }

        $goal['tasks'] = $goalTasks;
        return response()->json($goal);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $goalExist = DB::table('goals')
                ->where(['id' => $id, 'user_id' => $user_id])->first('id');
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!']);
            //TODO: log the error!
        }

        if (null === $goalExist){
            return response()->json([
                'message' => 'Such goal not exist!',
            ], 401);
        }

        $fields = $request->all();

        $message = [];

        if (isset($fields['title'])){
            $inputTitle = $request->validate(['title' => ['string','min:10','max:455']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['title' => $inputTitle['title']]);
                $message['message'] = 'Successfully updated goal title!';
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!']);
                //TODO: log the error!
            }
        }

        if (isset($fields['description'])){
            $inputDesc = $request->validate(['description' => ['string','min:10']]);

            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['description' => $inputDesc['description']]);
                array_push($message,'Successfully updated goal description!');
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!']);
                //TODO: log the error!
            }
        }

        if (isset($fields['category'])){
            $inputCategory = $request->validate(['category' => ['string','min:5','max:45']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['category' => $inputCategory['category']]);
                array_push($message,'Successfully updated goal category!');
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!']);
                //TODO: log the error!
            }
        }

        if (isset($fields['due_date'])){
            $inputDueDate = $request->validate(['due_date' => ['Date']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['due_date' => $inputDueDate['due_date']]);
                array_push($message,'Successfully updated goal Due Date!');
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!']);
                //TODO: log the error!
            }
        }

        if (isset($fields['completed'])){
            $inputDesc = $request->validate(['completed' => ['boolean']]);

            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['completed' => $inputDesc['completed']]);
                array_push($message,'Successfully updated completed goal!');
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!']);
                //TODO: log the error!
            }
        }

        return response()->json($message);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        try {
            $goalExist = DB::table('goals')
                ->where(['id' => $id, 'user_id' => $user_id])->first('id');
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!']);
            //TODO: log the error!
        }

        if (null === $goalExist){
            return response()->json([
                'message' => 'Such goal not exist!',
            ], 401);
        }

        try {
            $result = DB::table('goals')
                ->where('id',$id)
                ->where('user_id',$user_id)
                ->delete();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!']);
            //TODO: log the error!
        }

        if (!$result){
            return response()->json([
                'message' => 'Error! Such goal not exist!'
            ],400);
        }
        return response()->json(['message' => 'Successfully deleted goal!']);
    }
}