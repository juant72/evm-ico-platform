import React, { useState } from 'react';
import { NextPage } from 'next';
import { utils } from 'ethers';
import AdminPageContainer from '../../components/AdminPageContainer';
import { useVesting } from '../../hooks/useVesting';
import { formatTokenAmount } from '../../utils/format';

const VestingSetup: NextPage = () => {
  const {
    vestingSchedules,
    createSchedule,
    updateSchedule,
    revokeSchedule,
    isLoading,
  } = useVesting();

  const [newSchedule, setNewSchedule] = useState({
    beneficiary: '',
    amount: '',
    startTime: '',
    cliffDuration: '',
    duration: '',
    slicePeriodSeconds: '2592000', // 30 days in seconds
    revocable: true,
  });

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSchedule({
      beneficiary: newSchedule.beneficiary,
      amount: utils.parseEther(newSchedule.amount),
      startTime: Math.floor(new Date(newSchedule.startTime).getTime() / 1000),
      cliffDuration: parseInt(newSchedule.cliffDuration) * 86400, // Convert days to seconds
      duration: parseInt(newSchedule.duration) * 86400, // Convert days to seconds
      slicePeriodSeconds: parseInt(newSchedule.slicePeriodSeconds),
      revocable: newSchedule.revocable,
    });
  };

  return (
    <AdminPageContainer title="Vesting Setup" requiresAdmin>
      <div className="space-y-6">
        {/* Vesting Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Total Vesting</h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(vestingSchedules?.totalVesting)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Active Schedules</h3>
            <p className="text-3xl font-bold text-white">
              {vestingSchedules?.activeCount}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Total Released</h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(vestingSchedules?.totalReleased)}
            </p>
          </div>
        </div>

        {/* Create Schedule Form */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Create Vesting Schedule</h2>
          <form onSubmit={handleCreateSchedule} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Beneficiary Address
                </label>
                <input
                  type="text"
                  value={newSchedule.beneficiary}
                  onChange={(e) => setNewSchedule({...newSchedule, beneficiary: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Token Amount
                </label>
                <input
                  type="text"
                  value={newSchedule.amount}
                  onChange={(e) => setNewSchedule({...newSchedule, amount: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={newSchedule.startTime}
                  onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Cliff Duration (days)
                </label>
                <input
                  type="number"
                  value={newSchedule.cliffDuration}
                  onChange={(e) => setNewSchedule({...newSchedule, cliffDuration: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Vesting Duration (days)
                </label>
                <input
                  type="number"
                  value={newSchedule.duration}
                  onChange={(e) => setNewSchedule({...newSchedule, duration: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Release Period (seconds)
                </label>
                <input
                  type="number"
                  value={newSchedule.slicePeriodSeconds}
                  onChange={(e) => setNewSchedule({...newSchedule, slicePeriodSeconds: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newSchedule.revocable}
                onChange={(e) => setNewSchedule({...newSchedule, revocable: e.target.checked})}
                className="h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700"
              />
              <label className="ml-2 text-sm text-gray-200">
                Schedule is revocable
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Schedule'}
              </button>
            </div>
          </form>
        </div>

        {/* Active Schedules */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Active Schedules</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Beneficiary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Released
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300// filepath: /mnt/c/work/encrypia/ico-platform/frontend/src/pages/admin/vesting-setup.tsx
import React, { useState } from 'react';
import { NextPage } from 'next';
import { utils } from 'ethers';
import AdminPageContainer from '../../components/AdminPageContainer';
import { useVesting } from '../../hooks/useVesting';
import { formatTokenAmount } from '../../utils/format';

const VestingSetup: NextPage = () => {
  const {
    vestingSchedules,
    createSchedule,
    updateSchedule,
    revokeSchedule,
    isLoading,
  } = useVesting();

  const [newSchedule, setNewSchedule] = useState({
    beneficiary: '',
    amount: '',
    startTime: '',
    cliffDuration: '',
    duration: '',
    slicePeriodSeconds: '2592000', // 30 days in seconds
    revocable: true,
  });

  const handleCreateSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSchedule({
      beneficiary: newSchedule.beneficiary,
      amount: utils.parseEther(newSchedule.amount),
      startTime: Math.floor(new Date(newSchedule.startTime).getTime() / 1000),
      cliffDuration: parseInt(newSchedule.cliffDuration) * 86400, // Convert days to seconds
      duration: parseInt(newSchedule.duration) * 86400, // Convert days to seconds
      slicePeriodSeconds: parseInt(newSchedule.slicePeriodSeconds),
      revocable: newSchedule.revocable,
    });
  };

  return (
    <AdminPageContainer title="Vesting Setup" requiresAdmin>
      <div className="space-y-6">
        {/* Vesting Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Total Vesting</h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(vestingSchedules?.totalVesting)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Active Schedules</h3>
            <p className="text-3xl font-bold text-white">
              {vestingSchedules?.activeCount}
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-medium text-gray-200">Total Released</h3>
            <p className="text-3xl font-bold text-white">
              {formatTokenAmount(vestingSchedules?.totalReleased)}
            </p>
          </div>
        </div>

        {/* Create Schedule Form */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Create Vesting Schedule</h2>
          <form onSubmit={handleCreateSchedule} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Beneficiary Address
                </label>
                <input
                  type="text"
                  value={newSchedule.beneficiary}
                  onChange={(e) => setNewSchedule({...newSchedule, beneficiary: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Token Amount
                </label>
                <input
                  type="text"
                  value={newSchedule.amount}
                  onChange={(e) => setNewSchedule({...newSchedule, amount: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Start Date
                </label>
                <input
                  type="datetime-local"
                  value={newSchedule.startTime}
                  onChange={(e) => setNewSchedule({...newSchedule, startTime: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Cliff Duration (days)
                </label>
                <input
                  type="number"
                  value={newSchedule.cliffDuration}
                  onChange={(e) => setNewSchedule({...newSchedule, cliffDuration: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Vesting Duration (days)
                </label>
                <input
                  type="number"
                  value={newSchedule.duration}
                  onChange={(e) => setNewSchedule({...newSchedule, duration: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200">
                  Release Period (seconds)
                </label>
                <input
                  type="number"
                  value={newSchedule.slicePeriodSeconds}
                  onChange={(e) => setNewSchedule({...newSchedule, slicePeriodSeconds: e.target.value})}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md text-white px-3 py-2"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={newSchedule.revocable}
                onChange={(e) => setNewSchedule({...newSchedule, revocable: e.target.checked})}
                className="h-4 w-4 text-blue-600 rounded border-gray-600 bg-gray-700"
              />
              <label className="ml-2 text-sm text-gray-200">
                Schedule is revocable
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Schedule'}
              </button>
            </div>
          </form>
        </div>

        {/* Active Schedules */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Active Schedules</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Beneficiary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Released
                  </th>
                  // ... existing code remains the same until the table headers ...

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {vestingSchedules?.schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {schedule.beneficiary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatTokenAmount(schedule.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatTokenAmount(schedule.released)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${(Number(schedule.released) / Number(schedule.amount)) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          schedule.revoked
                            ? 'bg-red-900 text-red-200'
                            : schedule.completed
                            ? 'bg-green-900 text-green-200'
                            : 'bg-blue-900 text-blue-200'
                        }`}
                      >
                        {schedule.revoked
                          ? 'Revoked'
                          : schedule.completed
                          ? 'Completed'
                          : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      {!schedule.revoked && !schedule.completed && (
                        <button
                          onClick={() => revokeSchedule(schedule.id)}
                          className="text-red-400 hover:text-red-300"
                          disabled={isLoading}
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminPageContainer>
  );
};

export default VestingSetup;