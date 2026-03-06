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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 pb-4 border-b border-[var(--color-notion-border)] gap-4">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-[var(--color-notion-text)] capitalize min-w-[150px]">{toolbar.label}</h2>
                <div className="flex items-center bg-[var(--color-notion-bg)] border border-[var(--color-notion-border)] rounded-md overflow-hidden">
                    <button onClick={goToBack} className="p-1.5 hover:bg-[var(--color-notion-bg-hover)] transition-colors text-[var(--color-notion-text-muted)] border-r border-[var(--color-notion-border)]">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={goToCurrent} className="px-3 py-1 text-xs font-medium hover:bg-[var(--color-notion-bg-hover)] transition-colors text-[var(--color-notion-text)]">
                        Today
                    </button>
                    <button onClick={goToNext} className="p-1.5 hover:bg-[var(--color-notion-bg-hover)] transition-colors text-[var(--color-notion-text-muted)] border-l border-[var(--color-notion-border)]">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="flex items-center bg-[var(--color-notion-bg)] border border-[var(--color-notion-border)] rounded-md overflow-hidden">
                {['month', 'week', 'agenda'].map((view) => (
                    <button
                        key={view}
                        onClick={() => toolbar.onView(view)}
                        className={`px-3 py-1 text-xs transition-colors capitalize ${toolbar.view === view
                            ? 'bg-[var(--color-notion-bg-active)] font-medium text-[var(--color-notion-text)]'
                            : 'hover:bg-[var(--color-notion-bg-hover)] text-[var(--color-notion-text-muted)]'
                            } ${view !== 'agenda' ? 'border-r border-[var(--color-notion-border)]' : ''}`}
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
        <div className="h-full space-y-4 animate-in fade-in duration-500">
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
        .rbc-month-view { border-radius: 6px; overflow: hidden; border: 1px solid var(--color-notion-border); background: var(--color-notion-bg); box-shadow: none; }
        .rbc-header { padding: 8px; font-weight: 500; font-size: 0.75rem; color: var(--color-notion-text-muted); border-bottom: 1px solid var(--color-notion-border); }
        .rbc-off-range-bg { background: var(--color-notion-bg-subtle); }
        .rbc-day-bg + .rbc-day-bg { border-left: 1px solid var(--color-notion-border); }
        .rbc-month-row + .rbc-month-row { border-top: 1px solid var(--color-notion-border); }
        .rbc-today { background: var(--color-notion-bg-active) !important; }
        .rbc-show-more { color: var(--color-notion-text-meta); font-weight: 500; font-size: 0.75rem; padding: 2px 6px; }
        .rbc-date-cell { padding: 4px 8px; font-weight: 500; font-size: 0.8rem; color: var(--color-notion-text); }
        .rbc-date-cell.rbc-now { color: var(--color-notion-accent); font-weight: 600; }

        /* ── WEEK / DAY VIEW ── */
        .rbc-time-view { border-radius: 6px; overflow: hidden; border: 1px solid var(--color-notion-border); background: var(--color-notion-bg); box-shadow: none; }
        .rbc-time-header { border-bottom: 1px solid var(--color-notion-border); }
        .rbc-time-header-content { border-left: 1px solid var(--color-notion-border); }
        .rbc-time-header-cell .rbc-header { padding: 10px 8px; font-weight: 500; font-size: 0.75rem; color: var(--color-notion-text-muted); border-bottom: none; }
        .rbc-time-header-cell.rbc-today .rbc-header { color: var(--color-notion-accent); }
        .rbc-time-slot { border-top: 1px solid var(--color-notion-border-strong); font-size: 0.7rem; color: var(--color-notion-text-meta); }
        .rbc-time-gutter .rbc-time-slot { padding: 2px 8px; text-align: right; }
        .rbc-timeslot-group { min-height: 60px; border-bottom: 1px solid var(--color-notion-border); }
        .rbc-time-content { border-top: 1px solid var(--color-notion-border); }
        .rbc-time-content > * + * > * { border-left: 1px solid var(--color-notion-border); }
        .rbc-current-time-indicator { background: var(--color-notion-accent); height: 2px; }
        .rbc-current-time-indicator::before { content: ''; position: absolute; left: -4px; top: -4px; width: 10px; height: 10px; background: var(--color-notion-accent); border-radius: 50%; }

        /* ── AGENDA VIEW ── */
        .rbc-agenda-view { border-radius: 6px; overflow: hidden; border: 1px solid var(--color-notion-border); background: var(--color-notion-bg); box-shadow: none; }
        .rbc-agenda-view table { border-collapse: collapse; width: 100%; }
        .rbc-agenda-view table thead th { padding: 12px 16px; font-weight: 500; font-size: 0.75rem; color: var(--color-notion-text-muted); border-bottom: 1px solid var(--color-notion-border); background: var(--color-notion-bg-subtle); text-align: left; }
        .rbc-agenda-date-cell, .rbc-agenda-time-cell { padding: 12px 16px; font-size: 0.85rem; color: var(--color-notion-text); border-bottom: 1px solid var(--color-notion-border); white-space: nowrap; vertical-align: top; }
        .rbc-agenda-time-cell { color: var(--color-notion-text-meta); font-size: 0.75rem; }
        .rbc-agenda-event-cell { padding: 12px 16px; border-bottom: 1px solid var(--color-notion-border); }
        .rbc-agenda-empty { padding: 40px; text-align: center; color: var(--color-notion-text-meta); font-size: 0.85rem;}

        /* ── EVENTS ── */
        .rbc-event { transition: opacity 0.2s; border-radius: 4px; border: 1px solid rgba(0,0,0,0.1) !important; box-shadow: none !important; }
        .rbc-event:hover { opacity: 0.9; z-index: 10; cursor: pointer; }
        .rbc-event-label { font-size: 0.65rem; opacity: 0.8; margin-bottom: 2px;}
        .rbc-event-content { font-size: 0.75rem; }
        .rbc-addons-dnd-drag-preview { opacity: 0.5; }

        /* Disable Tailwind's dark mode specific rules for calendar as we use CSS variables now */
        .dark .rbc-month-view, .dark .rbc-time-view, .dark .rbc-agenda-view { border-color: var(--color-notion-border); background: var(--color-notion-bg); }
      `}} />

        </div>
    )
}

export default Calendar
