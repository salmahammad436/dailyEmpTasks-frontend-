import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Store'; 
import { fetchAllTasks } from '../../Store/Slices/Tasks/tasksSlice';

interface ProductivityTableProps {
  isModalVisible: boolean;
}

const ProductivityTable: React.FC<ProductivityTableProps> = ({ isModalVisible }) => {
  const dispatch: AppDispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(fetchAllTasks());
  }, [dispatch]);

  // Group tasks by employee name
  const groupedTasks = tasks.reduce((acc: Record<string, typeof tasks>, task) => {
    if (!acc[task.employee_name]) {
      acc[task.employee_name] = [];
    }
    acc[task.employee_name].push(task);
    return acc;
  }, {});

  

  return (
    <div className="container mx-auto flex justify-center mt-4">
      {/* {loading && <p>Loading...</p>} */}
      {error && <p className="text-red-500">Error: {error}</p>}
      {!isModalVisible&&(
        <table className="border border-slate-300 border-spacing-4 text-center">
          <thead>
            <tr>
              <th rowSpan={2} className="border border-slate-300 px-4 py-4">Employee Name</th>
              <th colSpan={3} className="border border-slate-300 px-4 py-4">Tasks</th>
              <th rowSpan={2} className="border border-slate-300 px-4 py-4">Productivity</th>
              <th rowSpan={2} className="border border-slate-300 px-4 py-4">Remaining Time</th>
            </tr>
            <tr>
              <th className="border border-slate-300 px-4 py-2">Task Name</th>
              <th className="border border-slate-300 px-4 py-2">From</th>
              <th className="border border-slate-300 px-4 py-2">To</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(groupedTasks).map(([employeeName, employeeTasks], index) => (
              <React.Fragment key={index}>
                {employeeTasks.map((task, taskIndex) => (
                  <tr key={task.id}>
                    {taskIndex === 0 && (
                      <td className="border border-slate-300 px-4 py-4" rowSpan={employeeTasks.length}>
                        {employeeName}
                      </td>
                    )}
                    <td className="border border-slate-300 px-4 py-4">{task.description}</td>
                    <td className="border border-slate-300 px-4 py-4">{task.start_time}</td>
                    <td className="border border-slate-300 px-4 py-4">{task.end_time}</td>
                    {taskIndex === 0 && (
                      <>
                        <td className="border border-slate-300 px-4 py-4" rowSpan={employeeTasks.length}>
                          <div className="flex flex-col items-center">
                            <div className="flex items-center mb-1">
                              <span className="text-black-600 text-sm mr-2">20</span>
                              <span className="text-gray-500 text-sm">%</span>
                            </div>
                            <div className="w-32 bg-purple-600 h-1 rounded-full"></div>
                          </div>
                        </td>
                        <td className="border border-slate-300 px-4 py-4" rowSpan={employeeTasks.length}>
                          {task.remaining_hours} hours
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductivityTable;
