import { Users, TrendingUp, Activity, UserCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import UsersTable from '../components/tables/UsersTable';
import { useLocation } from 'react-router-dom';
import { selectUsers } from '../store/usersSlice';

function StatCard({ icon: Icon, label, value, trend, color }) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5">
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
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted mt-0.5">{label}</p>
    </div>
  );
}

function PlaceholderPage({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-muted flex items-center justify-center mb-4">
        <Activity className="h-8 w-8 text-primary" />
      </div>
      <h2 className="text-lg font-semibold text-foreground mb-1">{title}</h2>
      <p className="text-sm text-muted">{description}</p>
    </div>
  );
}

function Dashboard() {
  const location = useLocation();
  const users = useSelector(selectUsers);
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === 'Active').length;

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
          color="bg-primary"
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
