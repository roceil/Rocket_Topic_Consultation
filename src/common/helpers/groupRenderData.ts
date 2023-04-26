import { IGroupRenderData } from '@/types/interface';

export function orderAppointments(appointments: IGroupRenderData[][]): IGroupRenderData[][] {
  return appointments.sort((a, b) => b[0].OrderId - a[0].OrderId);
}

export function groupAppointments(appointments: IGroupRenderData[]): IGroupRenderData[][] {
  const grouped: IGroupRenderData[][] = [];
  let currentOrderId = appointments[0]?.OrderId;
  let currentGroup: IGroupRenderData[] = [];

  appointments.forEach((appointment) => {
    if (appointment.OrderId !== currentOrderId) {
      grouped.push(currentGroup);
      currentOrderId = appointment.OrderId;
      currentGroup = [];
    }
    currentGroup.push(appointment);
  });
  grouped.push(currentGroup);

  return grouped;
}

export function formatAppointments(appointments: IGroupRenderData[]): IGroupRenderData[][] {
  const groupedAppointments = groupAppointments(appointments);
  const orderedAppointments = orderAppointments(groupedAppointments);
  return orderedAppointments;
}
