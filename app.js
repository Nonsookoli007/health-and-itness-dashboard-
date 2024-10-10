let totalWorkout = 0;
let totalWater = 0;
let totalCalories = 0;

const activities = {
    workouts: [],
    waterIntake: [],
    calories: []
};

document.getElementById('logActivityBtn').addEventListener('click', logActivity);

function logActivity() {
    const workoutInput = parseFloat(document.getElementById('workoutInput').value);
    const waterInput = parseFloat(document.getElementById('waterInput').value);
    const caloriesInput = parseFloat(document.getElementById('caloriesInput').value);

    if (workoutInput || waterInput || caloriesInput) {
        // Log the activity
        if (workoutInput > 0) {
            totalWorkout += workoutInput;
            activities.workouts.push(workoutInput);
        }

        if (waterInput > 0) {
            totalWater += waterInput;
            activities.waterIntake.push(waterInput);
        }

        if (caloriesInput > 0) {
            totalCalories += caloriesInput;
            activities.calories.push(caloriesInput);
        }

        // Update the summary
        updateSummary();

        // Render the activity list
        renderActivity(workoutInput, waterInput, caloriesInput);

        // Update chart
        updateChart();
    } else {
        alert('Please enter valid activity data.');
    }
}

function updateSummary() {
    document.getElementById('totalWorkout').innerText = totalWorkout;
    document.getElementById('totalWater').innerText = totalWater.toFixed(2);
    document.getElementById('totalCalories').innerText = totalCalories;
}

function renderActivity(workout, water, calories) {
    const activityList = document.getElementById('activityList');
    const activityItem = document.createElement('div');
    activityItem.classList.add('activity-item');

    activityItem.innerHTML = `
        <span>Workout: ${workout || 0} min, Water: ${water || 0} L, Calories: ${calories || 0} kcal</span>
    `;

    activityList.appendChild(activityItem);
}

// Setup chart
let ctx = document.getElementById('fitnessChart').getContext('2d');
let fitnessChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
            {
                label: 'Workout (min)',
                data: activities.workouts,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Water Intake (liters)',
                data: activities.waterIntake,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Calories Consumed',
                data: activities.calories,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updateChart() {
    fitnessChart.data.datasets[0].data = activities.workouts;
    fitnessChart.data.datasets[1].data = activities.waterIntake;
    fitnessChart.data.datasets[2].data = activities.calories;
    fitnessChart.update();
}