import { useState } from 'react'
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import frCA from 'date-fns/locale/fr-CA'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import { MOCK_CONTENT } from '../data/mockContent'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter } from 'lucide-react'

const DnDCalendar = withDragAndDrop(BigCalendar)

const locales = {
    'fr-CA': frCA,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})

const CustomToolbar = (toolbar) => {
    const goToBack = () => { toolbar.onNavigate('PREV') }
    const goToNext = () => { toolbar.onNavigate('NEXT') }
    const goToCurrent = () => { toolbar.onNavigate('TODAY') }

    return (
        <div className="flex items-center justify-between mb-8 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none transition-colors">
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white capitalize">{toolbar.label}</h2>
                <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-100 dark:border-slate-700">
                    <button onClick={goToBack} className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all text-slate-600 dark:text-slate-400">
                        <ChevronLeft size={20} />
                    </button>
                    <button onClick={goToCurrent} className="px-4 py-1.5 text-sm font-bold border-x border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-none transition-all text-slate-900 dark:text-white">
                        Today
                    </button>
                    <button onClick={goToNext} className="p-2 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm rounded-lg transition-all text-slate-600 dark:text-slate-400">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-1 rounded-xl border border-slate-100 dark:border-slate-700">
                {['month', 'week', 'agenda'].map((view) => (
                    <button
                        key={view}
                        onClick={() => toolbar.onView(view)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all capitalize ${toolbar.view === view
                            ? 'bg-white dark:bg-slate-700 shadow-md text-blue-600 dark:text-blue-400'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                    >
                        {view}
                    </button>
                ))}
            </div>
        </div>
    )
}

const Calendar = () => {
    const [events, setEvents] = useState(() => {
        return MOCK_CONTENT.map(item => ({
            id: item.id,
            title: item.title,
            start: new Date(item.date),
            end: new Date(item.date),
            allDay: true,
            resource: item
        }))
    })

    const onEventDrop = ({ event, start, end }) => {
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? { ...existingEvent, start, end }
                : existingEvent
        })
        setEvents(nextEvents)
    }

    const eventStyleGetter = (event) => {
        const pillarColors = {
            Sales: '#3b82f6', // blue-500
            Leadership: '#a855f7', // purple-500
            Systems: '#10b981', // emerald-500
            Discipline: '#f59e0b', // amber-500
            Community: '#f43f5e', // rose-500
        }

        return {
            style: {
                backgroundColor: pillarColors[event.resource.pillar] || '#64748b',
                borderRadius: '8px',
                opacity: 0.9,
                color: 'white',
                border: 'none',
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                padding: '2px 8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }
        }
    }

    return (
        <div className="h-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Publishing Calendar</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">Plan and visualize your content rollout strategy.</p>
                </div>
            </div>

            <div className="h-[750px] calendar-container">
                <DnDCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onEventDrop={onEventDrop}
                    draggableAccessor={() => true}
                    style={{ height: '100%' }}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                    culture="fr-CA"
                    messages={{
                        today: "Aujourd'hui",
                        previous: "Précédent",
                        next: "Suivant",
                        month: "Mois",
                        week: "Semaine",
                        day: "Jour",
                        agenda: "Agenda",
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        /* ── BASE ── */
        .rbc-calendar { font-family: inherit; background: transparent; }

        /* ── MONTH VIEW ── */
        .rbc-month-view { border-radius: 2rem; overflow: hidden; border: 1px solid #f1f5f9; background: white; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.05); }
        .rbc-header { padding: 12px; font-weight: 800; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.1em; color: #64748b; border-bottom: 1px solid #f1f5f9; }
        .rbc-off-range-bg { background: #f8fafc; }
        .rbc-day-bg + .rbc-day-bg { border-left: 1px solid #f1f5f9; }
        .rbc-month-row + .rbc-month-row { border-top: 1px solid #f1f5f9; }
        .rbc-today { background: #eff6ff !important; }
        .rbc-show-more { color: #3b82f6; font-weight: bold; font-size: 0.75rem; padding: 2px 6px; }
        .rbc-date-cell { padding: 4px 10px; font-weight: 700; font-size: 0.85rem; color: #475569; }
        .rbc-date-cell.rbc-now { color: #3b82f6; }

        /* ── WEEK / DAY VIEW ── */
        .rbc-time-view { border-radius: 2rem; overflow: hidden; border: 1px solid #f1f5f9; background: white; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.05); }
        .rbc-time-header { border-bottom: 2px solid #f1f5f9; }
        .rbc-time-header-content { border-left: 1px solid #f1f5f9; }
        .rbc-time-header-cell .rbc-header { padding: 14px 8px; font-weight: 800; font-size: 0.7rem; color: #64748b; border-bottom: none; }
        .rbc-time-header-cell.rbc-today .rbc-header { color: #3b82f6; }
        .rbc-time-slot { border-top: 1px solid #f8fafc; font-size: 0.7rem; font-weight: 700; color: #94a3b8; }
        .rbc-time-gutter .rbc-time-slot { padding: 2px 12px; text-align: right; }
        .rbc-timeslot-group { min-height: 60px; border-bottom: 1px solid #f1f5f9; }
        .rbc-time-content { border-top: 1px solid #f1f5f9; }
        .rbc-time-content > * + * > * { border-left: 1px solid #f1f5f9; }
        .rbc-current-time-indicator { background: #3b82f6; height: 2px; }
        .rbc-current-time-indicator::before { content: ''; position: absolute; left: -4px; top: -4px; width: 10px; height: 10px; background: #3b82f6; border-radius: 50%; }

        /* ── AGENDA VIEW ── */
        .rbc-agenda-view { border-radius: 2rem; overflow: hidden; border: 1px solid #f1f5f9; background: white; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.05); }
        .rbc-agenda-view table { border-collapse: collapse; width: 100%; }
        .rbc-agenda-view table thead th { padding: 14px 20px; font-weight: 800; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; border-bottom: 2px solid #f1f5f9; background: #f8fafc; }
        .rbc-agenda-date-cell, .rbc-agenda-time-cell { padding: 16px 20px; font-weight: 700; font-size: 0.85rem; color: #475569; border-bottom: 1px solid #f8fafc; white-space: nowrap; vertical-align: top; }
        .rbc-agenda-time-cell { color: #94a3b8; font-size: 0.75rem; }
        .rbc-agenda-event-cell { padding: 14px 20px; border-bottom: 1px solid #f8fafc; }
        .rbc-agenda-empty { padding: 60px; text-align: center; color: #94a3b8; font-weight: 700; }

        /* ── EVENTS ── */
        .rbc-event { transition: all 0.2s; border-radius: 8px; border: none !important; }
        .rbc-event:hover { transform: scale(1.02); z-index: 10; cursor: pointer; box-shadow: 0 10px 20px -5px rgba(0,0,0,0.25); }
        .rbc-event-label { font-size: 0.65rem; font-weight: 700; opacity: 0.85; }
        .rbc-event-content { font-size: 0.75rem; font-weight: 700; }
        .rbc-addons-dnd-drag-preview { opacity: 0.75; transform: scale(1.04); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }

        /* ── DARK MODE — MONTH ── */
        .dark .rbc-month-view { border-color: #1e293b; background: #0f172a; box-shadow: none; }
        .dark .rbc-header { color: #475569; border-bottom-color: #1e293b; background: #0f172a; }
        .dark .rbc-off-range-bg { background: #020617; }
        .dark .rbc-day-bg + .rbc-day-bg { border-left-color: #1e293b; }
        .dark .rbc-month-row + .rbc-month-row { border-top-color: #1e293b; }
        .dark .rbc-today { background: #1e3a5f !important; }
        .dark .rbc-date-cell { color: #64748b; }
        .dark .rbc-date-cell.rbc-now { color: #3b82f6; }
        .dark .rbc-show-more { color: #60a5fa; }

        /* ── DARK MODE — WEEK/DAY ── */
        .dark .rbc-time-view { border-color: #1e293b; background: #0f172a; box-shadow: none; }
        .dark .rbc-time-header { border-bottom-color: #1e293b; background: #0f172a; }
        .dark .rbc-time-header-content { border-left-color: #1e293b; }
        .dark .rbc-time-header-cell .rbc-header { color: #475569; }
        .dark .rbc-time-header-cell.rbc-today .rbc-header { color: #3b82f6; }
        .dark .rbc-timeslot-group { border-bottom-color: #1e293b; }
        .dark .rbc-time-slot { border-top-color: #0f172a; color: #334155; }
        .dark .rbc-time-content { border-top-color: #1e293b; }
        .dark .rbc-time-content > * + * > * { border-left-color: #1e293b; }

        /* ── DARK MODE — AGENDA ── */
        .dark .rbc-agenda-view { border-color: #1e293b; background: #0f172a; box-shadow: none; }
        .dark .rbc-agenda-view table thead th { background: #020617; color: #475569; border-bottom-color: #1e293b; }
        .dark .rbc-agenda-date-cell, .dark .rbc-agenda-time-cell { color: #475569; border-bottom-color: #1e293b; }
        .dark .rbc-agenda-event-cell { border-bottom-color: #1e293b; }
      `}} />

        </div>
    )
}

export default Calendar
