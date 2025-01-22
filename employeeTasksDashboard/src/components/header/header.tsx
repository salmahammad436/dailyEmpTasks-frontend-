import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { createTask } from "../../Store/Slices/Tasks/tasksSlice";
import { nanoid } from "@reduxjs/toolkit";

const Header: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [dateDifference, setDateDifference] = useState<number | null>(null);
  const [TaskName, setTaskName] = useState("");

  const { loading, error } = useSelector((state: RootState) => state.tasks);
  const dispatch: AppDispatch = useDispatch();

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setFromDate("");
    setToDate("");
    setTaskName("");
    setDateDifference(null);
  };

  const calculateTimeDifferenceInMinutes = (from: string, to: string) => {
    const [fromHours, fromMinutes] = from.split(":").map(Number);
    const [toHours, toMinutes] = to.split(":").map(Number);

    const fromTotalMinutes = fromHours * 60 + fromMinutes;
    const toTotalMinutes = toHours * 60 + toMinutes;

    if (toTotalMinutes <= fromTotalMinutes) {
      alert("End time must be later than start time");
      return null;
    }

    return toTotalMinutes - fromTotalMinutes;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const difference = calculateTimeDifferenceInMinutes(fromDate, toDate);
    if (difference === null) return;

    setDateDifference(difference);

    // Dispatch createTask with the required payload
    dispatch(
      createTask({
        id: +nanoid(),
        employee_id: 3,
        description: TaskName,
        start_time: fromDate,
        end_time: toDate,
        date: new Date().toISOString(),
        total_hours: difference.toString(),
        remaining_hours: "0",
        employee_name: "",
      })
    );

    // Close the modal and reset the form
    handleCloseModal();
  };

  return (
    <div className="flex justify-between py-6">
      <div>
        <h1 className="text-2xl font-extrabold">Daily Employees Tasks</h1>
        <p className="text-gray-500">Manage your employees</p>
      </div>
      <div className="space-x-3">
        <button className="px-4 py-2 border rounded-md shadow-lg">
          Export
        </button>
        <button
          onClick={handleClick}
          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Employee
        </button>
      </div>

      {isModalVisible && (
        <div
          id="crud-modal"
          tabIndex={-1}
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-gray-800 bg-opacity-50"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div className="relative p-4 w-full max-w-md">
            <div className="bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create New Task
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-900"
                >
                  <span className="sr-only">Close modal</span>&times;
                </button>
              </div>
              <form className="p-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="employee-name"
                    className="block mb-2 text-sm font-medium"
                  >
                    Task Name:
                  </label>
                  <input
                    id="employee-name"
                    type="text"
                    className="w-full p-2 border rounded"
                    value={TaskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="from-time"
                    className="block mb-2 text-sm font-medium"
                  >
                    From Time
                  </label>
                  <input
                    id="from-time"
                    type="time"
                    className="w-full p-2 border rounded"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="to-time"
                    className="block mb-2 text-sm font-medium"
                  >
                    To Time
                  </label>
                  <input
                    id="to-time"
                    type="time"
                    className="w-full p-2 border rounded"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>
                {dateDifference !== null && (
                  <p className="text-sm text-gray-600">
                    Time difference: {dateDifference} minutes
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded"
                  disabled={loading}
                >
                  {loading ? "Adding Task..." : "Add Task"}
                </button>
                {error && (
                  <p className="text-sm text-red-500 mt-2">
                    Failed to add task: {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
