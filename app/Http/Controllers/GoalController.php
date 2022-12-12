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
            return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
            //TODO: log the error!
        }

        if (count($goalsList) < 1){
            return response()->json(['message' => 'No Goals Yet!'],400);
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
            ],400);

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
            ],400);
            //TODO: log the error!
        }

        $addedGoal = Goal::where('user_id',$user_id)
            ->where('title',$fields['title'])->first();

        return response()->json([
            "message" => "Successfully added new goal!",
            "goal" => $addedGoal
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

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true){
            return response()->json(['message' => $result['message']], 400);
        }

        $goal = (array)$result['goal'];

        try {
            $goalTasks = DB::table('tasks')
                ->where(['goal_id' => $id])
                ->where(['user_id' => $user_id])
                ->get();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
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

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true){
            return response()->json(['message' => $result['message']], 400);
        }

        $fields = $request->all();

        if (isset($fields['title'])){
            $inputTitle = $request->validate(['title' => ['string','min:10','max:455']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['title' => $inputTitle['title']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
        }

        if (isset($fields['description'])){
            $inputDesc = $request->validate(['description' => ['string','min:10']]);

            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['description' => $inputDesc['description']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
        }

        if (isset($fields['category'])){
            $inputCategory = $request->validate(['category' => ['string','min:5','max:45']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['category' => $inputCategory['category']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
        }

        if (isset($fields['due_date'])){
            $inputDueDate = $request->validate(['due_date' => ['Date']]);
            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['due_date' => $inputDueDate['due_date']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
        }

        if (isset($fields['completed'])){
            $inputDesc = $request->validate(['completed' => ['boolean']]);

            try {
                Goal::where('user_id',$user_id)->where('id',$id)
                    ->update(['completed' => $inputDesc['completed']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
        }

        $updatedGoal = Goal::where('user_id',$user_id)
            ->where('id',$id)->first();

        return response()->json([
            "message" => "Successfully updated goal!",
            "goal" => $updatedGoal
        ],201);
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true){
            return response()->json(['message' => $result['message']], 400);
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
        return response()->json(['goalId' => $id, 'message' => 'Successfully deleted goal!']);
    }

    private static function chekIfExist(mixed $user_id, int $goal_id): array
    {
        $result = ['error' => false, 'message' => ''];
        try {
            $goalExist = DB::table('goals')
                ->where(['id' => $goal_id, 'user_id' => $user_id])->first();
        }catch (QueryException $exception){
            $result['error'] = true;
            $result['message'] = 'An Error Occur! Please, try again!';
            return $result;
            //TODO: log the error!
        }

        if (null === $goalExist){
            $result['error'] = true;
            $result['message'] = 'Such goal not exist!';
        }
        $result['goal'] = $goalExist;
        return $result;
    }

}
