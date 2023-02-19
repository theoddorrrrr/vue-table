<template>
    <n-space vertical :size="5">
        <n-space>
            <n-button @click="clearFilters">Clear Filters</n-button>
            <n-button @click="clearSorter">Clear Sorter</n-button>
        </n-space>
        <n-data-table :columns="columns" :data="data" :pagination="pagination" :summary="summary" :key="(row) => row.key"
            ref="dataTableInst" />
    </n-space>
</template>
  
<script>
import { defineComponent, ref, h } from 'vue'
import { InitialData, filterOptions } from '../data/data'
import { statusHandler, percentHandler, summary, formatDate, } from '../helpers/helpers'


export default defineComponent({
    setup() {
        const data = ref(InitialData)
        const dataTableInstRef = ref(null)

        const getDataIndex = (key) => {
            return data.value.findIndex((item) => item.key === key)
        }

        return {
            data,
            dataTableInst: dataTableInstRef,
            columns: [
                {
                    title: 'Client',
                    key: 'client',
                    sorter: 'default',
                },
                {
                    title: 'Project',
                    key: 'project',
                    sorter: 'default'
                },
                {
                    title: 'Start date',
                    key: 'startDate',
                    sorter: {
                        compare: (a, b) => formatDate(a, b)
                    },
                },
                {
                    title: 'Status',
                    key: 'status',
                    sorter: {
                        compare: (a, b) => a.status.localeCompare(b.status),
                    },
                    filterOptions,
                    filter(value, row) {
                        return ~row.status.indexOf(value)
                    },
                    render(row) {
                        const index = getDataIndex(row.key)
                        const item = filterOptions.find(item => item.value === row.status)

                        return h(statusHandler, {
                            value: row.status,
                            img: item.src,
                            onUpdateValue(v) {
                                data.value[index].status = v
                            }
                        })
                    }
                },
                {
                    title: 'Percent',
                    key: 'percent',
                    sorter: 'default',
                    render(row) {
                        const index = getDataIndex(row.key)

                        return h(percentHandler, {
                            value: row.percent,
                            onUpdateValue(v) {
                                data.value[index].percent = v
                            },
                        })
                    }
                },
                {
                    title: 'Revenue',
                    key: 'revenue',
                    sorter: 'default'
                }
            ],
            summary: summary.bind(data),
            pagination: ref({ pageSize: 5 }),
            clearFilters() {
                dataTableInstRef.value.filter(null)
            },
            clearSorter() {
                dataTableInstRef.value.sort(null)
            },
        }
    }
})
</script>