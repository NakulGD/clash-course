const TimeTable = () => {
    return (
        <div class="timetable">
            <div class="timetable-header">
                <div class="timetable-cell">Time</div>
                <div class="timetable-cell">Monday</div>
                <div class="timetable-cell">Tuesday</div>
                <div class="timetable-cell">Wednesday</div>
                <div class="timetable-cell">Thursday</div>
                <div class="timetable-cell">Friday</div>
            </div>
            <div class="timetable-row">
                <div class="timetable-cell">9:00 AM</div>
                <div class="timetable-cell">Math</div>
                <div class="timetable-cell">Science</div>
                <div class="timetable-cell">English</div>
                <div class="timetable-cell">History</div>
                <div class="timetable-cell">Art</div>
            </div>
            <div class="timetable-row">
                <div class="timetable-cell">10:00 AM</div>
                <div class="timetable-cell">Science</div>
                <div class="timetable-cell">Math</div>
                <div class="timetable-cell">History</div>
                <div class="timetable-cell">English</div>
                <div class="timetable-cell">Physical Education</div>
            </div>
        </div>
    );
};

export default TimeTable;