// Sample data
        let chemicals = [
            {
                id: '1',
                name: 'Sodium Hydroxide',
                casNumber: '1310-73-2',
                initialQuantity: 1000,
                currentQuantity: 750,
                unit: 'g',
                location: 'Lab A',
                supplier: 'Sigma-Aldrich',
                catalogNumber: 'S8045',
                dateReceived: '2023-01-15',
                expiryDate: '2024-01-15',
                notes: 'Store in a cool, dry place'
            },
            {
                id: '2',
                name: 'Hydrochloric Acid',
                casNumber: '7647-01-0',
                initialQuantity: 2500,
                currentQuantity: 1800,
                unit: 'ml',
                location: 'Lab B',
                supplier: 'Merck',
                catalogNumber: 'H1758',
                dateReceived: '2023-02-10',
                expiryDate: '2024-02-10',
                notes: 'Corrosive, handle with care'
            },
            {
                id: '3',
                name: 'Ethanol',
                casNumber: '64-17-5',
                initialQuantity: 5000,
                currentQuantity: 2200,
                unit: 'ml',
                location: 'Storage Room',
                supplier: 'VWR',
                catalogNumber: 'E7023',
                dateReceived: '2023-01-05',
                expiryDate: '2025-01-05',
                notes: 'Flammable, keep away from heat sources'
            },
            {
                id: '4',
                name: 'Acetone',
                casNumber: '67-64-1',
                initialQuantity: 2000,
                currentQuantity: 150,
                unit: 'ml',
                location: 'Lab A',
                supplier: 'Fisher Scientific',
                catalogNumber: 'A9281',
                dateReceived: '2023-03-20',
                expiryDate: '2024-03-20',
                notes: 'Highly flammable'
            },
            {
                id: '5',
                name: 'Methylene Blue',
                casNumber: '61-73-4',
                initialQuantity: 100,
                currentQuantity: 85,
                unit: 'g',
                location: 'Lab B',
                supplier: 'Sigma-Aldrich',
                catalogNumber: 'M9140',
                dateReceived: '2023-02-25',
                expiryDate: '2023-12-25',
                notes: 'Store at room temperature'
            }
        ];
        
        let usageHistory = [
            {
                id: '1',
                chemicalId: '1',
                chemicalName: 'Sodium Hydroxide',
                dateUsed: '2023-05-10',
                quantityUsed: 50,
                unit: 'g',
                personInCharge: 'John Doe',
                remarks: 'Used for pH adjustment'
            },
            {
                id: '2',
                chemicalId: '2',
                chemicalName: 'Hydrochloric Acid',
                dateUsed: '2023-05-12',
                quantityUsed: 200,
                unit: 'ml',
                personInCharge: 'Jane Smith',
                remarks: 'Used for titration experiment'
            },
            {
                id: '3',
                chemicalId: '3',
                chemicalName: 'Ethanol',
                dateUsed: '2023-05-15',
                quantityUsed: 500,
                unit: 'ml',
                personInCharge: 'Mike Johnson',
                remarks: 'Used for sample preparation'
            },
            {
                id: '4',
                chemicalId: '4',
                chemicalName: 'Acetone',
                dateUsed: '2023-05-18',
                quantityUsed: 350,
                unit: 'ml',
                personInCharge: 'Sarah Williams',
                remarks: 'Used for cleaning glassware'
            },
            {
                id: '5',
                chemicalId: '1',
                chemicalName: 'Sodium Hydroxide',
                dateUsed: '2023-05-20',
                quantityUsed: 100,
                unit: 'g',
                personInCharge: 'John Doe',
                remarks: 'Used for neutralization'
            },
            {
                id: '6',
                chemicalId: '3',
                chemicalName: 'Ethanol',
                dateUsed: '2023-05-22',
                quantityUsed: 800,
                unit: 'ml',
                personInCharge: 'Mike Johnson',
                remarks: 'Used for extraction'
            },
            {
                id: '7',
                chemicalId: '4',
                chemicalName: 'Acetone',
                dateUsed: '2023-05-25',
                quantityUsed: 1500,
                unit: 'ml',
                personInCharge: 'Sarah Williams',
                remarks: 'Used for solvent extraction'
            }
        ];
        
        // Global variables
        let currentChemicalId = null;
        let selectedChemicals = [];
        let usageChart, locationChart, trendsChart;
        let darkMode = false;
        
        // DOM Elements
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        const pages = document.querySelectorAll('.page');
        const addChemicalBtn = document.getElementById('addChemicalBtn');
        const addChemicalBtn2 = document.getElementById('addChemicalBtn2');
        const updateInventoryBtn = document.getElementById('updateInventoryBtn');
        const logUsageBtn = document.getElementById('logUsageBtn');
        const viewAlertsBtn = document.getElementById('viewAlertsBtn');
        const generateReportBtn = document.getElementById('generateReportBtn');
        const exportBtn = document.getElementById('exportBtn');
        const printBtn = document.getElementById('printBtn');
        const darkModeToggle = document.getElementById('darkModeToggle');
        const searchInput = document.getElementById('searchInput');
        const inventorySearch = document.getElementById('inventorySearch');
        const locationFilter = document.getElementById('locationFilter');
        const usageSearch = document.getElementById('usageSearch');
        const usageFromDate = document.getElementById('usageFromDate');
        const usageToDate = document.getElementById('usageToDate');
        const exportUsageBtn = document.getElementById('exportUsageBtn');
        const bulkActionBtn = document.getElementById('bulkActionBtn');
        const selectAllChemicals = document.getElementById('selectAllChemicals');
        const exportDataBtn = document.getElementById('exportDataBtn');
        const importDataBtn = document.getElementById('importDataBtn');
        const clearDataBtn = document.getElementById('clearDataBtn');
        
        // Modal elements
        const modals = document.querySelectorAll('.modal');
        const closeModalBtns = document.querySelectorAll('.closeModal');
        const addChemicalModal = document.getElementById('addChemicalModal');
        const updateInventoryModal = document.getElementById('updateInventoryModal');
        const viewChemicalModal = document.getElementById('viewChemicalModal');
        const editChemicalModal = document.getElementById('editChemicalModal');
        const confirmDeleteModal = document.getElementById('confirmDeleteModal');
        const confirmClearDataModal = document.getElementById('confirmClearDataModal');
        const bulkActionsModal = document.getElementById('bulkActionsModal');
        const moveLocationModal = document.getElementById('moveLocationModal');
        
        // Form elements
        const addChemicalForm = document.getElementById('addChemicalForm');
        const updateInventoryForm = document.getElementById('updateInventoryForm');
        const editChemicalForm = document.getElementById('editChemicalForm');
        const moveLocationForm = document.getElementById('moveLocationForm');
        const chemicalSelect = document.getElementById('chemicalSelect');
        
        // Table elements
        const chemicalsTable = document.getElementById('chemicalsTable');
        const usageHistoryTable = document.getElementById('usageHistoryTable');
        const recentActivityTable = document.getElementById('recentActivityTable');
        
        // Chart elements
        const inventoryChart = document.getElementById('inventoryChart');
        const usageChart = document.getElementById('usageChart');
        const locationChart = document.getElementById('locationChart');
        const trendsChart = document.getElementById('trendsChart');
        
        // Alert elements
        const alertContainer = document.getElementById('alertContainer');
        const expiryAlertsList = document.getElementById('expiryAlertsList');
        const stockAlertsList = document.getElementById('stockAlertsList');
        const expiringSoonList = document.getElementById('expiringSoonList');
        
        // Print elements
        const printInventoryTable = document.getElementById('printInventoryTable');
        const printUsageTable = document.getElementById('printUsageTable');
        const printDate = document.getElementById('printDate');
        
        // Other elements
        const alertCount = document.getElementById('alertCount');
        const notificationBadge = document.getElementById('notificationBadge');
        const totalChemicals = document.getElementById('totalChemicals');
        const nearExpiryCount = document.getElementById('nearExpiryCount');
        const lowStockCount = document.getElementById('lowStockCount');
        const deleteChemicalName = document.getElementById('deleteChemicalName');
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        const confirmClearDataBtn = document.getElementById('confirmClearDataBtn');
        const selectedItemsCount = document.getElementById('selectedItemsCount');
        const moveItemsCount = document.getElementById('moveItemsCount');
        const bulkExportBtn = document.getElementById('bulkExportBtn');
        const bulkMoveBtn = document.getElementById('bulkMoveBtn');
        const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
        
        // Initialize the application
        document.addEventListener('DOMContentLoaded', function() {
            // Load data from localStorage
            loadFromLocalStorage();
            
            // Initialize UI
            updateDashboard();
            renderChemicalsTable();
            renderUsageHistoryTable();
            renderRecentActivity();
            updateChemicalSelect();
            updateAlerts();
            initCharts();
            
            // Set today's date as default for date inputs
            const today = new Date().toISOString().split('T')[0];
            document.querySelectorAll('input[type="date"]').forEach(input => {
                if (!input.value) {
                    input.value = today;
                }
            });
            
            // Event listeners for navigation
            sidebarItems.forEach(item => {
                item.addEventListener('click', function() {
                    const target = this.getAttribute('data-target');
                    showPage(target);
                    
                    // Mark sidebar item as active
                    sidebarItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Event listeners for buttons
            addChemicalBtn.addEventListener('click', () => openModal(addChemicalModal));
            addChemicalBtn2.addEventListener('click', () => openModal(addChemicalModal));
            updateInventoryBtn.addEventListener('click', () => openModal(updateInventoryModal));
            logUsageBtn.addEventListener('click', () => openModal(updateInventoryModal));
            viewAlertsBtn.addEventListener('click', () => showPage('alerts'));
            generateReportBtn.addEventListener('click', printReport);
            exportBtn.addEventListener('click', exportToExcel);
            printBtn.addEventListener('click', printReport);
            bulkActionBtn.addEventListener('click', () => {
                selectedItemsCount.textContent = `${selectedChemicals.length} items selected`;
                openModal(bulkActionsModal);
            });
            
            // Event listeners for forms
            addChemicalForm.addEventListener('submit', handleAddChemical);
            updateInventoryForm.addEventListener('submit', handleUpdateInventory);
            editChemicalForm.addEventListener('submit', handleEditChemical);
            moveLocationForm.addEventListener('submit', handleMoveLocation);
            
            // Event listeners for bulk actions
            bulkExportBtn.addEventListener('click', exportSelectedToExcel);
            bulkMoveBtn.addEventListener('click', () => {
                moveItemsCount.textContent = `${selectedChemicals.length} items selected`;
                closeModal(bulkActionsModal);
                openModal(moveLocationModal);
            });
            bulkDeleteBtn.addEventListener('click', confirmBulkDelete);
            
            // Event listeners for modals
            closeModalBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const modal = this.closest('.modal');
                    closeModal(modal);
                });
            });
            
            // Event listeners for filters
            inventorySearch.addEventListener('input', renderChemicalsTable);
            locationFilter.addEventListener('change', renderChemicalsTable);
            usageSearch.addEventListener('input', renderUsageHistoryTable);
            usageFromDate.addEventListener('change', renderUsageHistoryTable);
            usageToDate.addEventListener('change', renderUsageHistoryTable);
            
            // Event listeners for data management
            exportDataBtn.addEventListener('click', exportAllData);
            importDataBtn.addEventListener('click', importData);
            clearDataBtn.addEventListener('click', () => openModal(confirmClearDataModal));
            confirmClearDataBtn.addEventListener('click', clearAllData);
            
            // Event listener for select all checkbox
            selectAllChemicals.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('.chemical-checkbox');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                    const chemicalId = checkbox.getAttribute('data-id');
                    if (this.checked) {
                        if (!selectedChemicals.includes(chemicalId)) {
                            selectedChemicals.push(chemicalId);
                        }
                    } else {
                        selectedChemicals = selectedChemicals.filter(id => id !== chemicalId);
                    }
                });
            });
            
            // Event listener for dark mode toggle
            darkModeToggle.addEventListener('change', toggleDarkMode);
            
            // Event listener for sidebar toggle
            sidebarToggle.addEventListener('click', toggleSidebar);
            
            // Event listener for search input
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                if (searchTerm) {
                    showPage('inventory');
                    inventorySearch.value = searchTerm;
                    renderChemicalsTable();
                }
            });
            
            // Event listener for export usage button
            exportUsageBtn.addEventListener('click', exportUsageToExcel);
        });
        
        // Function to show a specific page
        function showPage(pageId) {
            pages.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('active');
            });
            
            const activePage = document.getElementById(pageId);
            if (activePage) {
                activePage.classList.remove('hidden');
                activePage.classList.add('active');
            }
        }
        
        // Function to open a modal
        function openModal(modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        }
        
        // Function to close a modal
        function closeModal(modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        
        // Function to toggle sidebar
        function toggleSidebar() {
            sidebar.classList.toggle('-translate-x-full');
        }
        
        // Function to toggle dark mode
        function toggleDarkMode() {
            darkMode = !darkMode;
            document.documentElement.classList.toggle('dark');
            
            if (darkMode) {
                document.body.classList.add('bg-gray-900', 'text-white');
                document.body.classList.remove('bg-gray-100');
            } else {
                document.body.classList.remove('bg-gray-900', 'text-white');
                document.body.classList.add('bg-gray-100');
            }
        }
        
        // Function to save data to localStorage
        function saveToLocalStorage() {
            localStorage.setItem('chemicals', JSON.stringify(chemicals));
            localStorage.setItem('usageHistory', JSON.stringify(usageHistory));
        }
        
        // Function to load data from localStorage
        function loadFromLocalStorage() {
            const savedChemicals = localStorage.getItem('chemicals');
            const savedUsageHistory = localStorage.getItem('usageHistory');
            
            if (savedChemicals) {
                chemicals = JSON.parse(savedChemicals);
            }
            
            if (savedUsageHistory) {
                usageHistory = JSON.parse(savedUsageHistory);
            }
        }
        
        // Function to update the dashboard
        function updateDashboard() {
            // Update counts
            totalChemicals.textContent = chemicals.length;
            
            // Near expiry count
            const today = new Date();
            const nearExpiryItems = chemicals.filter(chemical => {
                const expiryDate = new Date(chemical.expiryDate);
                const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                return daysUntilExpiry <= 30;
            });
            
            nearExpiryCount.textContent = nearExpiryItems.length;
            
            // Low stock count
            const lowStockItems = chemicals.filter(chemical => {
                const stockPercentage = (chemical.currentQuantity / chemical.initialQuantity) * 100;
                return stockPercentage <= 10;
            });
            
            lowStockCount.textContent = lowStockItems.length;
            
            // Update expiring soon list
            expiringSoonList.innerHTML = '';
            
            if (nearExpiryItems.length === 0) {
                expiringSoonList.innerHTML = '<p class="text-gray-500">No chemicals expiring soon.</p>';
            } else {
                nearExpiryItems.slice(0, 5).forEach(chemical => {
                    const expiryDate = new Date(chemical.expiryDate);
                    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
                    
                    const item = document.createElement('div');
                    item.className = 'flex items-center justify-between py-2 border-b last:border-0';
                    
                    item.innerHTML = `
                        <div>
                            <p class="font-medium">${chemical.name}</p>
                            <p class="text-sm text-gray-500">${chemical.location}</p>
                        </div>
                        <div class="text-right">
                            <p class="${daysUntilExpiry <= 7 ? 'text-red-600' : 'text-amber-600'} font-medium">${daysUntilExpiry} days</p>
                            <p class="text-sm text-gray-500">${formatDate(chemical.expiryDate)}</p>
                        </div>
                    `;
                    
                    expiringSoonList.appendChild(item);
                });
            }
        }
        
        // Function to render the chemicals table
        function renderChemicalsTable() {
            chemicalsTable.innerHTML = '';
            
            // Apply filters
            const searchTerm = inventorySearch.value.toLowerCase();
            const locationValue = locationFilter.value;
            
            let filteredChemicals = chemicals;
            
            if (searchTerm) {
                filteredChemicals = filteredChemicals.filter(chemical => 
                    chemical.name.toLowerCase().includes(searchTerm) || 
                    chemical.casNumber.toLowerCase().includes(searchTerm) ||
                    (chemical.supplier && chemical.supplier.toLowerCase().includes(searchTerm))
                );
            }
            
            if (locationValue) {
                filteredChemicals = filteredChemicals.filter(chemical => chemical.location === locationValue);
            }
            
            if (filteredChemicals.length === 0) {
                const emptyRow = document.createElement('tr');
                emptyRow.innerHTML = `
                    <td colspan="8" class="py-4 px-4 text-center text-gray-500">No chemicals found.</td>
                `;
                chemicalsTable.appendChild(emptyRow);
                return;
            }
            
            // Sort by name
            filteredChemicals.sort((a, b) => a.name.localeCompare(b.name));
            
            filteredChemicals.forEach(chemical => {
                const row = document.createElement('tr');
                row.className = 'border-b hover:bg-gray-50';
                
                // Calculate stock percentage
                const stockPercentage = (chemical.currentQuantity / chemical.initialQuantity) * 100;
                
                // Determine status
                let statusClass = 'bg-green-100 text-green-800';
                let```