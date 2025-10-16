import type { ElForm, ElScrollbar, ElTree } from 'element-plus'

import type { ComponentExposed } from 'vue-component-type-helpers'
import type globalDialog from '~/components/global-dialog.vue'
import type globalTable from '~/components/global-table.vue'

export type FormInstance = InstanceType<typeof ElForm>
export type TreeInstance = InstanceType<typeof ElTree>
export type ScrollbarInstance = InstanceType<typeof ElScrollbar>

export type GlobalDialogInstance = InstanceType<typeof globalDialog>
export type GlobalTableInstance = ComponentExposed<typeof globalTable>
