'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventContentArg } from '@fullcalendar/core';
import { FaGraduationCap } from 'react-icons/fa';
import { FaSchoolFlag } from 'react-icons/fa6';

export type CalendarEvent = {
            id: string,
            title: string,
            start: string,
            end: string,
            textColor?: string,
            extendedProps: {
              instructor: string,
              student: string
            }
          }
export default function CustomFullCalendar({data}: {data?: any}) {
  // Custom event rendering to show instructor and student names
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div className="p-1 overflow-hidden">
        <div className="font-semibold text-xs truncate">
          {eventInfo.isFuture ? eventInfo.event.title : eventInfo.event.title}
        </div>
        <div className="text-xs truncate flex gap-1 items-center">
          <FaGraduationCap className="flex-shrink-0" />
          <span>{eventInfo.event.extendedProps.instructor}</span>
        </div>
        <div className="text-xs truncate flex gap-1 items-center">
          <FaSchoolFlag className="flex-shrink-0" />
          <span>{eventInfo.event.extendedProps.student}</span>
        </div>
      </div>
    );
  };
   console.log(data , "data in custom full calendar")
  return (
    <div className="bg-white p-4 mx-4 my-4 rounded-xl shadow">
      <FullCalendar
         // ...
            slotEventOverlap={false}   // IMPORTANT
            eventOverlap={false}       // prevents squeezing side-by-side
            eventMaxStack={10}  
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="nl"
        firstDay={1}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        height="auto"
        slotMinTime="06:00:00"
        slotMaxTime="22:00:00"
        slotDuration="00:30:00"
        nowIndicator={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          meridiem: false
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          meridiem: false
        }}
        editable={false}
        selectable={true}
        eventContent={renderEventContent}
        eventClassNames="cursor-pointer transition-opacity"
        events={data}
      />
      <style jsx global>{`
/* =========================
   FULLCALENDAR — BLUE UI
   + WEEK/DAY SPACING
   + NO ELLIPSIS (SHOW FULL CONTENT)
   ========================= */

.fc {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  --fc-border-color: #e5e7eb;
  --fc-page-bg-color: #ffffff;
}

/* Grid borders */
.fc-theme-standard .fc-scrollgrid,
.fc-theme-standard td,
.fc-theme-standard th {
  border-color: #e5e7eb !important;
}

/* Toolbar title */
.fc .fc-toolbar-title {
  font-size: 13px !important;
  font-weight: 600;
  color: #374151;
}

/* Toolbar spacing */
.fc .fc-toolbar {
  padding: 10px 12px;
}

/* Column headers */
.fc .fc-col-header-cell-cushion {
  color: #2563eb !important;
  font-weight: 600;
  padding: 10px 4px;
  text-transform: lowercase;
}

/* Day numbers (month view) */
.fc .fc-daygrid-day-number {
  color: #374151 !important;
  font-weight: 500;
  padding: 8px;
  font-size: 12px;
}

/* -------------------------
   Buttons (like screenshot)
-------------------------- */
.fc .fc-button-primary {
  background: #eaf2ff !important;
  border: 1px solid #eaf2ff !important;
  color: #2563eb !important;
  font-weight: 600;
  margin: 0 2px !important;
  font-size: 12px !important;
  text-transform: lowercase;
  border-radius: 10px !important;
  box-shadow: none !important;
  outline: none !important;
  padding: 8px 14px !important;
}

.fc .fc-button-primary:hover:not(:disabled) {
  background: #dbeaff !important;
  border-color: #dbeaff !important;
  color: #1d4ed8 !important;
  box-shadow: none !important;
}

.fc .fc-button-primary:disabled {
  opacity: 0.6 !important;
}

.fc .fc-button-active {
  background: #2563eb !important;
  border-color: #2563eb !important;
  color: #ffffff !important;
  box-shadow: none !important;
}

/* remove focus ring */
.fc .fc-button:focus,
.fc .fc-button-primary:focus {
  outline: none !important;
  box-shadow: none !important;
}

/* -------------------------
   Today / Highlight
-------------------------- */
.fc .fc-daygrid-day.fc-day-today {
  background: transparent !important;
}

/* range selection highlight */
.fc .fc-highlight,
.fc .fc-daygrid-bg-harness .fc-highlight {
  background-color: #e3f2ff !important;
  opacity: 1 !important;
}

/* -------------------------
   EVENTS — base style
-------------------------- */
.fc .fc-event,
.fc .fc-daygrid-event,
.fc .fc-timegrid-event {
  background-color: #e3f2ff !important;
  border: 1px solid transparent !important;
  color: #1e40af !important;
  border-radius: 10px !important;
  padding: 6px 10px !important;
  line-height: 1.25 !important;
  font-size: 12px !important;
  box-shadow: none !important;
}

/* event title/time */
.fc .fc-event .fc-event-title,
.fc .fc-event .fc-event-time {
  color: #1e40af !important;
  font-weight: 600;
}

/* event hover */
.fc .fc-event:hover {
  background-color: #d6ecff !important;
  opacity: 1 !important;
}

/* =========================
   WEEK / DAY VIEW SPACING
========================= */

/* reduce slot height a bit */
.fc-timegrid-slot {
  height: 2.6em !important;
}

/* time labels softer */
.fc-timegrid-slot-label {
  vertical-align: middle !important;
  color: #6b7280 !important;
  font-weight: 500;
}

/* gap between events */
.fc-timegrid-event {
  margin-top: 5px !important;
  margin-bottom: 5px !important;
}

/* harness padding so event doesn't stick to borders */
.fc-timegrid-event-harness {
  padding: 2px 0 !important;
}

/* week view: slight horizontal breathing */
.fc-timeGridWeek-view .fc-timegrid-event {
  margin-left: 3px !important;
  margin-right: 3px !important;
}

/* day view: more horizontal breathing */
.fc-timeGridDay-view .fc-timegrid-event {
  margin-left: 8px !important;
  margin-right: 8px !important;
}

/* all-day row padding */
.fc .fc-timegrid-axis-cushion,
.fc .fc-timegrid-slot-label-cushion {
  padding: 6px 8px !important;
}

/* =========================
   FIX: SHOW FULL CONTENT (NO "0..")
========================= */

/* remove ellipsis + allow wrapping */
.fc-timegrid-event .fc-event-title,
.fc-timegrid-event .fc-event-time,
.fc-timegrid-event .fc-event-title-container,
.fc-timegrid-event .fc-event-main {
  white-space: normal !important;
  overflow: visible !important;
  text-overflow: clip !important;
}

/* prevent inner containers from clipping */
.fc-timegrid-event .fc-event-main-frame {
  overflow: visible !important;
}

/* IMPORTANT: minimum visible height so text+icons fit */
.fc-timegrid-event {
  min-height: 56px !important; /* adjust 48..72 if needed */
  height: auto !important;
}

/* make sure layout allows multiple lines */
.fc-timegrid-event .fc-event-main {
  display: block !important;
  line-height: 1.25 !important;
}

/* -------------------------
   Now indicator
-------------------------- */
.fc .fc-timegrid-now-indicator-line {
  border-color: #ef4444 !important;
  border-width: 2px !important;
}
.fc .fc-timegrid-now-indicator-arrow {
  border-color: #ef4444 !important;
}



      `}</style>
    </div>
  );
}
