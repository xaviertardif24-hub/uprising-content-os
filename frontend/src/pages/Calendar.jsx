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
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Filter, Plus } from 'lucide-react'

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
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 pb-4 border-b border-[rgba(55,53,47,0.16)] gap-4">
            <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold text-[#37352F] capitalize min-w-[150px]">{toolbar.label}</h2>
                <div className="flex items-center bg-white border border-[rgba(55,53,47,0.16)] rounded-md overflow-hidden shadow-sm">
                    <button onClick={goToBack} className="p-1.5 hover:bg-[rgba(55,53,47,0.04)] transition-colors text-[rgba(55,53,47,0.65)] border-r border-[rgba(55,53,47,0.16)]">
                        <ChevronLeft size={16} />
                    </button>
                    <button onClick={goToCurrent} className="px-3 py-1 text-xs font-medium hover:bg-[rgba(55,53,47,0.04)] transition-colors text-[#37352F]">
                        Aujourd'hui
                    </button>
                    <button onClick={goToNext} className="p-1.5 hover:bg-[rgba(55,53,47,0.04)] transition-colors text-[rgba(55,53,47,0.65)] border-l border-[rgba(55,53,47,0.16)]">
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="flex items-center bg-white border border-[rgba(55,53,47,0.16)] rounded-md overflow-hidden shadow-sm">
                {['month', 'week', 'agenda'].map((view) => {
                    const viewNames = { month: 'Mois', week: 'Semaine', agenda: 'Agenda' };
                    return (
                        <button
                            key={view}
                            onClick={() => toolbar.onView(view)}
                            className={`px-3 py-1 text-xs transition-colors capitalize ${toolbar.view === view
                                ? 'bg-[rgba(55,53,47,0.08)] font-medium text-[#37352F]'
                                : 'hover:bg-[rgba(55,53,47,0.04)] text-[rgba(55,53,47,0.65)]'
                                } ${view !== 'agenda' ? 'border-r border-[rgba(55,53,47,0.16)]' : ''}`}
                        >
                            {viewNames[view]}
                        </button>
                    )
                })}
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

    const onSelectSlot = (slotInfo) => {
        const title = window.prompt("Nom du nouvel élément :");
        if (title) {
            const newEvent = {
                id: Date.now(),
                title,
                start: slotInfo.start,
                end: slotInfo.end,
                allDay: slotInfo.action === 'doubleClick' || slotInfo.action === 'click',
                resource: { pillar: 'Default' }
            };
            setEvents([...events, newEvent]);
        }
    }

    const onSelectEvent = (event) => {
        const action = window.prompt(`Action pour "${event.title}": Taper "supprimer" pour l'effacer, ou entrer un nouveau nom pour renommer.`, event.title);
        
        if (action?.toLowerCase() === 'supprimer') {
            setEvents(events.filter(e => e.id !== event.id));
        } else if (action && action !== event.title) {
            setEvents(events.map(e => e.id === event.id ? { ...e, title: action } : e));
        }
    }

    const eventStyleGetter = (event) => {
        const pillarColors = {
            Sales: '#3b82f6', // blue-500
            Leadership: '#a855f7', // purple-500
            Systems: '#10b981', // emerald-500
            Discipline: '#f59e0b', // amber-500
            Community: '#f43f5e', // rose-500
            Default: '#64748b',
        }

        return {
            style: {
                backgroundColor: pillarColors[event.resource?.pillar] || pillarColors.Default,
                borderRadius: '4px',
                color: 'white',
                border: 'none',
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '500',
                padding: '2px 6px',
            }
        }
    }

    return (
        <div className="h-full space-y-4 animate-in fade-in duration-500 px-6 pt-4 max-w-[1100px] mx-auto text-[#37352F]">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Calendrier</h1>
                <button 
                    onClick={() => onSelectSlot({ start: new Date(), end: new Date(), action: 'click' })}
                    className="flex items-center gap-1 bg-[#2383E2] hover:bg-[#1E71C8] text-white px-3 py-1.5 rounded text-sm font-medium transition-colors shadow-sm"
                >
                    <Plus size={16} />
                    Nouveau
                </button>
            </div>
            <p className="text-sm text-[rgba(55,53,47,0.65)] mb-6">
                Cliquez sur une date pour ajouter un élément. Cliquez sur un élément pour le modifier ou taper "supprimer".
            </p>

            <div className="h-[700px] calendar-container bg-white rounded-lg p-2">
                <DnDCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onEventDrop={onEventDrop}
                    draggableAccessor={() => true}
                    selectable
                    onSelectSlot={onSelectSlot}
                    onSelectEvent={onSelectEvent}
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
                        showMore: total => `+ ${total} autres`
                    }}
                />
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        /* ── BASE ── */
        .rbc-calendar { font-family: inherit; background: transparent; }

        /* ── MONTH VIEW ── */
        .rbc-month-view { border-radius: 6px; overflow: hidden; border: 1px solid rgba(55,53,47,0.16); background: white; box-shadow: none; }
        .rbc-header { padding: 8px; font-weight: 500; font-size: 0.75rem; color: rgba(55,53,47,0.65); border-bottom: 1px solid rgba(55,53,47,0.16); }
        .rbc-off-range-bg { background: rgba(55,53,47,0.03); }
        .rbc-day-bg + .rbc-day-bg { border-left: 1px solid rgba(55,53,47,0.16); }
        .rbc-month-row + .rbc-month-row { border-top: 1px solid rgba(55,53,47,0.16); }
        .rbc-today { background: rgba(35,131,226,0.05) !important; }
        .rbc-show-more { color: rgba(55,53,47,0.65); font-weight: 500; font-size: 0.75rem; padding: 2px 6px; }
        .rbc-date-cell { padding: 4px 8px; font-weight: 500; font-size: 0.8rem; color: #37352F; }
        .rbc-date-cell.rbc-now { color: #2383E2; font-weight: 600; }

        /* ── WEEK / DAY VIEW ── */
        .rbc-time-view { border-radius: 6px; overflow: hidden; border: 1px solid rgba(55,53,47,0.16); background: white; box-shadow: none; }
        .rbc-time-header { border-bottom: 1px solid rgba(55,53,47,0.16); }
        .rbc-time-header-content { border-left: 1px solid rgba(55,53,47,0.16); }
        .rbc-time-header-cell .rbc-header { padding: 10px 8px; font-weight: 500; font-size: 0.75rem; color: rgba(55,53,47,0.65); border-bottom: none; }
        .rbc-time-header-cell.rbc-today .rbc-header { color: #2383E2; }
        .rbc-time-slot { border-top: 1px solid rgba(55,53,47,0.08); font-size: 0.7rem; color: rgba(55,53,47,0.4); }
        .rbc-time-gutter .rbc-time-slot { padding: 2px 8px; text-align: right; }
        .rbc-timeslot-group { min-height: 60px; border-bottom: 1px solid rgba(55,53,47,0.16); }
        .rbc-time-content { border-top: 1px solid rgba(55,53,47,0.16); }
        .rbc-time-content > * + * > * { border-left: 1px solid rgba(55,53,47,0.16); }
        .rbc-current-time-indicator { background: #2383E2; height: 2px; }
        .rbc-current-time-indicator::before { content: ''; position: absolute; left: -4px; top: -4px; width: 10px; height: 10px; background: #2383E2; border-radius: 50%; }

        /* ── AGENDA VIEW ── */
        .rbc-agenda-view { border-radius: 6px; overflow: hidden; border: 1px solid rgba(55,53,47,0.16); background: white; box-shadow: none; }
        .rbc-agenda-view table { border-collapse: collapse; width: 100%; }
        .rbc-agenda-view table thead th { padding: 12px 16px; font-weight: 500; font-size: 0.75rem; color: rgba(55,53,47,0.65); border-bottom: 1px solid rgba(55,53,47,0.16); background: rgba(55,53,47,0.03); text-align: left; }
        .rbc-agenda-date-cell, .rbc-agenda-time-cell { padding: 12px 16px; font-size: 0.85rem; color: #37352F; border-bottom: 1px solid rgba(55,53,47,0.16); white-space: nowrap; vertical-align: top; }
        .rbc-agenda-time-cell { color: rgba(55,53,47,0.65); font-size: 0.75rem; }
        .rbc-agenda-event-cell { padding: 12px 16px; border-bottom: 1px solid rgba(55,53,47,0.16); }
        .rbc-agenda-empty { padding: 40px; text-align: center; color: rgba(55,53,47,0.65); font-size: 0.85rem;}

        /* ── EVENTS ── */
        .rbc-event { padding: 2px !important; margin: 1px 0; }
        .rbc-event:hover { filter: brightness(0.9); z-index: 10; cursor: pointer; }
        .rbc-event-label { display: none; } /* Hide time on month view */
        .rbc-event-content { font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
        .rbc-addons-dnd-drag-preview { opacity: 0.5; }
      `}} />

        </div>
    )
}

export default Calendar
