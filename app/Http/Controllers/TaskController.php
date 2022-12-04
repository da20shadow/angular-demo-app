<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use App\Models\Task;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
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
            $tasksList = DB::table('tasks')
                ->select('*')
                ->where(['user_id' => $user_id])
                ->where('status','!=','Completed')
                ->get();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
            //TODO: log the error!
        }

        if (count($tasksList) < 1){
            return response()->json(['message' => 'No Tasks Yet!'],400);
        }
        return response()->json($tasksList);
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
            'end_date' => ['date'],
            'priority' => ['string'],
            'goal_id' => ['Integer'],
            'task_id' => ['Integer'],
        ]);

        $user_id = auth()->user()->getAuthIdentifier();

        //Check if goal ID exist
        if (isset($fields['goal_id'])){

            try {
                $goalExist = Goal::where('user_id',$user_id)
                    ->where('id',$fields['goal_id'])->first();
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }

            if (!$goalExist){
                return response()->json(['message' => 'There is no goal with this ID!'],400);
            }
        }

        //Check if parent task exists
        if (isset($fields['task_id'])){
            try {
                $taskExist = Task::where('user_id',$user_id)
                    ->where('id',$fields['task_id'])->first();
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
            if (!$taskExist){
                return response()->json(['message' => 'There is no parent task with this ID!'],400);
            }
        }

        //Check if task title exist
        try {
            $taskTitleExist = Task::where('user_id',$user_id)
                ->where('title',$fields['title'])->first();
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
            //TODO: log the error!
        }

        if ($taskTitleExist !== null) {
            return response()->json(['message' => 'Task with the same title already added! Just set it recur!'],400);
        }

        $fields['user_id'] = $user_id;

        try {
            Task::create($fields);
        }catch (QueryException $exception){
            return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
            //TODO: log the error!
        }

        return response()->json([
            'message' => 'Successfully added new task!',
            'task' => $fields,
        ],201);

    }

    /**
     * Display the specified resource.
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

        return response()->json($result['task']);
    }

    /**
     * Update the specified resource in storage.
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

        $message = [];

        if (isset($fields['title'])){
            $inputTitle = $request->validate(['title' => ['string','min:10','max:455']]);
            try {
                Task::where('user_id',$user_id)->where('id',$id)
                    ->update(['title' => $inputTitle['title']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
            $message['message'] = 'Successfully updated task title!';
        }

        if (isset($fields['description'])){
            $inputDesc = $request->validate(['description' => ['string','min:10']]);

            try {
                Task::where('user_id',$user_id)->where('id',$id)
                    ->update(['description' => $inputDesc['description']]);
            }catch (QueryException $exception ){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
            array_push($message,'Successfully updated task description!');
        }

        if (isset($fields['status'])){
            $inputCategory = $request->validate(['status' => ['string']]);

            try {
                Task::where('user_id',$user_id)->where('id',$id)
                    ->update(['status' => $inputCategory['status']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
            array_push($message,'Successfully updated task status!');
        }

        if (isset($fields['end_date'])){
            $inputDueDate = $request->validate(['end_date' => ['Date']]);

            try {
                Task::where('user_id',$user_id)->where('id',$id)
                    ->update(['end_date' => $inputDueDate['end_date']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
            array_push($message,'Successfully updated task End Date!');
        }

        if (isset($fields['start_date'])){
            $inputDueDate = $request->validate(['start_date' => ['Date']]);

            try {
                Task::where('user_id',$user_id)->where('id',$id)
                    ->update(['start_date' => $inputDueDate['start_date']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
            array_push($message,'Successfully updated task Start Date!');
        }

        if (isset($fields['priority'])){
            $inputDesc = $request->validate(['priority' => ['string']]);

            try {
                Task::where('user_id',$user_id)->where('id',$id)
                    ->update(['priority' => $inputDesc['priority']]);
            }catch (QueryException $exception){
                return response()->json(['message' => 'An Error Occur! Please, try again!'],400);
                //TODO: log the error!
            }
            array_push($message,'Successfully updated task priority!');
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

        $result = self::chekIfExist($user_id, $id);
        if ($result['error'] === true){
            return response()->json(['message' => $result['message']], 400);
        }

        $result = DB::table('tasks')
            ->where('id',$id)
            ->where('user_id',$user_id)
            ->delete();

        if (!$result){
            return response()->json([
                'message' => 'Error! Such task not exist!'
            ],400);
        }
        return response()->json(['message' => 'Successfully deleted task!']);
    }

    private static function chekIfExist(mixed $user_id, int $task_id): array
    {
        $result = ['error' => false, 'message' => ''];
        try {
            $taskExist = DB::table('tasks')
                ->where(['id' => $task_id, 'user_id' => $user_id])
                ->first();
        }catch (QueryException $exception){
            $result['error'] = true;
            $result['message'] = 'An Error Occur! Please, try again!';
            return $result;
            //TODO: log the error!
        }

        if (null === $taskExist){
            $result['error'] = true;
            $result['message'] = 'Such task not exist!';
        }

        $result['task'] = $taskExist;
        return $result;
    }
}
