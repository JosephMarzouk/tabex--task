import { Users, TrendingUp, Activity, UserCheck } from 'lucide-react';
import UsersTable from '../components/tables/UsersTable';
import { useLocation } from 'react-router-dom';
import mockData from '../data/mockData.json';

function StatCard({ icon: Icon, label, value, trend, color }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{value}</p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{label}</p>
    </div>
  );
}

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
        <Activity className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{title}</h2>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  const totalUsers = mockData.users.length;
  const activeUsers = mockData.users.filter((u) => u.status === 'Active').length;

  if (location.pathname === '/dashboard/analytics') {
    return <PlaceholderPage title="Analytics" description="Analytics dashboard coming soon." />;
  }
  if (location.pathname === '/dashboard/settings') {
    return <PlaceholderPage title="Settings" description="Settings panel coming soon." />;
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Users"
          value={totalUsers}
          trend="+12%"
          color="bg-indigo-600"
        />
        <StatCard
          icon={UserCheck}
          label="Active Users"
          value={activeUsers}
          trend="+5%"
          color="bg-emerald-600"
        />
        <StatCard
          icon={TrendingUp}
          label="New This Month"
          value="3"
          trend="+20%"
          color="bg-violet-600"
        />
        <StatCard
          icon={Activity}
          label="Inactive"
          value={totalUsers - activeUsers}
          color="bg-zinc-600"
        />
      </div>

      {/* Table */}
      <UsersTable />
    </div>
  );
}

export default Dashboard;
