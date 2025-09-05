import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '@/config/environment';

export interface DashboardStats {
  activeUsers: number;
  productsManaged: number;
  pendingApprovals: number;
  lowStockItems: number;
  usersTrend: string;
  productsTrend: string;
  approvalsTrend: string;
  stockTrend: string;
}

export interface PendingApproval {
  id: string;
  type: string;
  product: string;
  quantity: number;
  requestedBy: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: string;
}

export interface RecentActivity {
  id: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  time: string;
  createdAt: string;
}

export interface InventoryHealth {
  stockAccuracy: number;
  avgTurnover: number;
  lowStockCount: number;
  activeSKUs: number;
  skusTrend: string;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await apiClient.get<DashboardStats>(`${API_ENDPOINTS.ANALYTICS}/dashboard/stats`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch dashboard stats');
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    // Fallback to mock data if API fails
    return {
      activeUsers: 45,
      productsManaged: 1247,
      pendingApprovals: 12,
      lowStockItems: 8,
      usersTrend: '+3',
      productsTrend: '+87',
      approvalsTrend: '+4',
      stockTrend: '-2'
    };
  }
};

export const getPendingApprovals = async (): Promise<PendingApproval[]> => {
  try {
    const response = await apiClient.get<PendingApproval[]>(`${API_ENDPOINTS.ANALYTICS}/dashboard/approvals`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch pending approvals');
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    // Fallback to mock data if API fails
    return [
      {
        id: 'SA-001',
        type: 'Stock Adjustment',
        product: 'Set Top Box Telnet TV',
        quantity: 50,
        requestedBy: 'John Doe',
        time: '2 hours ago',
        priority: 'high',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'SA-002',
        type: 'Stock Adjustment',
        product: 'Fiber Optic Cable',
        quantity: -25,
        requestedBy: 'Jane Smith',
        time: '4 hours ago',
        priority: 'medium',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'PO-003',
        type: 'Purchase Order',
        product: 'Network Switch',
        quantity: 10,
        requestedBy: 'Admin System',
        time: '1 day ago',
        priority: 'low',
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
};

export const getRecentActivities = async (): Promise<RecentActivity[]> => {
  try {
    const response = await apiClient.get<RecentActivity[]>(`${API_ENDPOINTS.ANALYTICS}/dashboard/activities`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch recent activities');
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    // Fallback to mock data if API fails
    return [
      {
        id: '1',
        message: 'Stock adjustment approved for Wireless Router',
        type: 'success',
        time: '10 min ago',
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
      },
      {
        id: '2',
        message: 'New vendor registration: PT Telnet Suppliers',
        type: 'info',
        time: '1 hour ago',
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
      },
      {
        id: '3',
        message: 'Low stock alert: Fiber Cable (5 remaining)',
        type: 'warning',
        time: '2 hours ago',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: '4',
        message: 'Bulk inventory update completed',
        type: 'success',
        time: '3 hours ago',
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
};

export const getInventoryHealth = async (): Promise<InventoryHealth> => {
  try {
    const response = await apiClient.get<InventoryHealth>(`${API_ENDPOINTS.ANALYTICS}/dashboard/inventory-health`);
    if (response.success && response.data) {
      return response.data;
    }
    throw new Error(response.message || 'Failed to fetch inventory health');
  } catch (error) {
    console.error('Error fetching inventory health:', error);
    // Fallback to mock data if API fails
    return {
      stockAccuracy: 98.5,
      avgTurnover: 12.5,
      lowStockCount: 8,
      activeSKUs: 247,
      skusTrend: '+15 this month'
    };
  }
};

export const approveRequest = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.post(`${API_ENDPOINTS.ANALYTICS}/dashboard/approvals/${id}/approve`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to approve request');
    }
  } catch (error) {
    console.error('Error approving request:', error);
    throw error;
  }
};

export const rejectRequest = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.post(`${API_ENDPOINTS.ANALYTICS}/dashboard/approvals/${id}/reject`);
    if (!response.success) {
      throw new Error(response.message || 'Failed to reject request');
    }
  } catch (error) {
    console.error('Error rejecting request:', error);
    throw error;
  }
};

export default {
  getDashboardStats,
  getPendingApprovals,
  getRecentActivities,
  getInventoryHealth,
  approveRequest,
  rejectRequest
};