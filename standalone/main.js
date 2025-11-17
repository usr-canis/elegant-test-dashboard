// Mock data generation
function generateMockData() {
    const moduleNames = [
        "Authentication", "Database", "API Gateway", "User Management", "Payment Processing",
        "Notification Service", "File Storage", "Analytics", "Security", "Logging",
        "Cache", "Search", "Workflow", "Integration", "Performance",
        "UI Components", "Validation", "Encryption", "Session Management", "Email Service",
        "SMS Service", "Report Generation", "Data Export", "Configuration", "Monitoring"
    ];

    const modules = moduleNames.map((name, moduleIndex) => {
        const modulePassed = Math.floor(Math.random() * 100) + 20;
        const moduleFailed = Math.floor(Math.random() * 10);
        const moduleSkipped = Math.floor(Math.random() * 5);
        const moduleNotExecuted = Math.floor(Math.random() * 8);

        const files = Array.from({ length: Math.floor(Math.random() * 5) + 3 }, (_, fileIndex) => {
            const filePassed = Math.floor(Math.random() * 20) + 5;
            const fileFailed = Math.floor(Math.random() * 3);
            const fileSkipped = Math.floor(Math.random() * 2);
            const fileNotExecuted = Math.floor(Math.random() * 3);

            const testcases = Array.from({ length: filePassed + fileFailed + fileSkipped + fileNotExecuted }, (_, tcIndex) => {
                let result;
                if (tcIndex < filePassed) result = "passed";
                else if (tcIndex < filePassed + fileFailed) result = "failed";
                else if (tcIndex < filePassed + fileFailed + fileSkipped) result = "skipped";
                else result = "not_executed";

                return {
                    number: `TC-${(tcIndex + 1).toString().padStart(3, "0")}`,
                    result: result,
                    command: `pytest tests/module_${moduleIndex + 1}/test_file_${fileIndex + 1}.py::TestCase${tcIndex + 1}`,
                    expectedResult: result === "failed" ? "Expected status code 200" : null,
                    actualResult: result === "failed" ? "Received status code 500 - Internal Server Error" : null
                };
            });

            return {
                name: `test_${["basic", "advanced", "integration", "edge_cases", "performance"][fileIndex]}_${moduleIndex + 1}.py`,
                passed: filePassed,
                failed: fileFailed,
                skipped: fileSkipped,
                notExecuted: fileNotExecuted,
                status: fileFailed > 0 ? "failed" : filePassed > 0 ? "passed" : "partial",
                testcases: testcases
            };
        });

        return {
            name: `Module ${(moduleIndex + 1).toString().padStart(2, "0")} - ${name}`,
            passed: modulePassed,
            failed: moduleFailed,
            skipped: moduleSkipped,
            notExecuted: moduleNotExecuted,
            files: files
        };
    });

    const totalPassed = modules.reduce((sum, m) => sum + m.passed, 0);
    const totalFailed = modules.reduce((sum, m) => sum + m.failed, 0);
    const totalSkipped = modules.reduce((sum, m) => sum + m.skipped, 0);
    const totalNotExecuted = modules.reduce((sum, m) => sum + m.notExecuted, 0);

    return {
        passed: totalPassed,
        failed: totalFailed,
        skipped: totalSkipped,
        notExecuted: totalNotExecuted,
        modules: modules
    };
}

// Initialize data
const mockData = generateMockData();

// Create pie chart
function createPieChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Passed', 'Failed', 'Skipped', 'Not Executed'],
            datasets: [{
                data: [data.passed, data.failed, data.skipped, data.notExecuted],
                backgroundColor: ['#10b981', '#ef4444', '#f59e0b', '#6b7280'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: { size: 12 }
                    }
                }
            }
        }
    });
}

// Update stats
function updateStats() {
    document.getElementById('totalPassed').textContent = mockData.passed;
    document.getElementById('totalFailed').textContent = mockData.failed;
    document.getElementById('totalSkipped').textContent = mockData.skipped;
    document.getElementById('totalNotExecuted').textContent = mockData.notExecuted;
    document.getElementById('moduleCount').textContent = `(${mockData.modules.length})`;
}

// Render modules
function renderModules() {
    const modulesList = document.getElementById('modulesList');
    
    mockData.modules.forEach((module, moduleIndex) => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        
        const moduleHeader = document.createElement('div');
        moduleHeader.className = 'module-header';
        moduleHeader.innerHTML = `
            <div class="module-name">${module.name}</div>
            <div class="module-stats">
                <span class="passed">${module.passed}</span>
                <span class="failed">${module.failed}</span>
                <span class="skipped">${module.skipped}</span>
                <span class="not-executed">${module.notExecuted}</span>
                <span class="arrow">▼</span>
            </div>
        `;
        
        const moduleContent = document.createElement('div');
        moduleContent.className = 'module-content';
        
        const chartContainer = document.createElement('div');
        chartContainer.className = 'module-chart-container';
        chartContainer.innerHTML = `<canvas id="moduleChart${moduleIndex}"></canvas>`;
        
        const filesTable = document.createElement('table');
        filesTable.innerHTML = `
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Passed</th>
                    <th>Failed</th>
                    <th>Skipped</th>
                    <th>Not Executed</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody id="filesBody${moduleIndex}"></tbody>
        `;
        
        moduleContent.appendChild(chartContainer);
        moduleContent.appendChild(filesTable);
        
        moduleCard.appendChild(moduleHeader);
        moduleCard.appendChild(moduleContent);
        modulesList.appendChild(moduleCard);
        
        // Module click handler
        moduleHeader.addEventListener('click', () => {
            const isExpanded = moduleContent.classList.contains('expanded');
            moduleContent.classList.toggle('expanded');
            moduleHeader.querySelector('.arrow').classList.toggle('expanded');
            
            if (!isExpanded) {
                createPieChart(`moduleChart${moduleIndex}`, module);
                renderFiles(module.files, moduleIndex);
            }
        });
    });
}

// Render files
function renderFiles(files, moduleIndex) {
    const filesBody = document.getElementById(`filesBody${moduleIndex}`);
    
    files.forEach((file, fileIndex) => {
        const fileRow = document.createElement('tr');
        fileRow.className = 'file-row';
        fileRow.innerHTML = `
            <td>${file.name}</td>
            <td>${file.passed}</td>
            <td>${file.failed}</td>
            <td>${file.skipped}</td>
            <td>${file.notExecuted}</td>
            <td><span class="status-badge ${file.status}">${file.status}</span></td>
        `;
        
        const fileDetails = document.createElement('tr');
        fileDetails.className = 'file-details';
        fileDetails.innerHTML = `
            <td colspan="6">
                <table>
                    <thead>
                        <tr>
                            <th>Test Case</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody id="testcasesBody${moduleIndex}_${fileIndex}"></tbody>
                </table>
            </td>
        `;
        
        filesBody.appendChild(fileRow);
        filesBody.appendChild(fileDetails);
        
        // File click handler
        fileRow.addEventListener('click', () => {
            const isExpanded = fileDetails.classList.contains('expanded');
            fileDetails.classList.toggle('expanded');
            
            if (!isExpanded) {
                renderTestcases(file.testcases, moduleIndex, fileIndex);
            }
        });
    });
}

// Render testcases
function renderTestcases(testcases, moduleIndex, fileIndex) {
    const testcasesBody = document.getElementById(`testcasesBody${moduleIndex}_${fileIndex}`);
    
    testcases.forEach((testcase, tcIndex) => {
        const testcaseRow = document.createElement('tr');
        testcaseRow.className = 'testcase-row';
        testcaseRow.innerHTML = `
            <td>${testcase.number}</td>
            <td><span class="status-badge ${testcase.result}">${testcase.result}</span></td>
        `;
        
        const testcaseDetails = document.createElement('tr');
        testcaseDetails.className = 'testcase-details';
        testcaseDetails.innerHTML = `
            <td colspan="2" class="details-cell">
                <div class="detail-block">
                    <div class="detail-label">Command:</div>
                    <div class="detail-content">${testcase.command}</div>
                </div>
                ${testcase.result === 'failed' ? `
                    <div class="detail-block">
                        <div class="detail-label">Expected Result:</div>
                        <div class="detail-content success">${testcase.expectedResult}</div>
                    </div>
                    <div class="detail-block">
                        <div class="detail-label">Actual Result:</div>
                        <div class="detail-content error">${testcase.actualResult}</div>
                    </div>
                ` : ''}
            </td>
        `;
        
        testcasesBody.appendChild(testcaseRow);
        testcasesBody.appendChild(testcaseDetails);
        
        // Testcase click handler
        testcaseRow.addEventListener('click', () => {
            testcaseDetails.classList.toggle('expanded');
        });
    });
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    createPieChart('overallChart', mockData);
    renderModules();
});