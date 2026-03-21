import { Users, TrendingUp, Activity, UserCheck } from 'lucide-react';
import { useSelector } from 'react-redux';
import UsersTable from '../components/tables/UsersTable';
import { useLocation } from 'react-router-dom';
import { selectUsers } from '../store/usersSlice';
import StatCard from '../components/layout/StatesCard';


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

  const StatCardList = [
    { icon: Users, label: 'Total Users', value: totalUsers, trend: '+12%', color: 'bg-primary' },
    { icon: UserCheck, label: 'Active Users', value: activeUsers, trend: '+5%', color: 'bg-emerald-600' },
    { icon: TrendingUp, label: 'New This Month', value: '3', trend: '+20%', color: 'bg-violet-600' },
    { icon: Activity, label: 'Inactive', value: totalUsers - activeUsers, color: 'bg-zinc-600' },
  ];

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
        {StatCardList.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
        
      </div>

      {/* Table */}
      <UsersTable />
    </div>
  );
}

export default Dashboard;
