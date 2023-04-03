<script setup lang="ts">
import { ref,  computed } from 'vue';
import type { Ref } from 'vue';
import axios from "axios";
// import gql from 'graphql-tag'
interface Student {
  studentId: string
  name: string
  surName: string
  gpa: number
}
const searchId: Ref<string> = ref('')
const students: Ref<Student[]> = ref([])


const showOutput = computed(() => students.value.length > 0)
const totalGPa = computed(() => {
  if (students.value.length > 0) {
    return students.value.reduce((r, c) => r + c.gpa, 0) / students.value.length
  } else {
    return 0.0
  }
})
function onCheckStudentsClicked() {
  axios.get(import.meta.env.VITE_BASE_URL + '/students', { params: { id: searchId.value } }).then((data) => {
    students.value = data.data

  }
  )
}

function onCheckStudentClicked() {
  axios.get(import.meta.env.VITE_BASE_URL + '/student', { params: { id: searchId.value } }).then((data) => {
    students.value = data.data

  }
  )
}

</script>

<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32 bg-slate-200">

    <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">Check you
      students data</h1>
    <p class="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">let search your students data :)</p>
  </div>
  <div class="border-b border-gray-200 ">
    <div class="pb-5 sm:flex sm:items-center sm:justify-between mx-32">
      <div class="mt-3">
        <label for="studentId" class="sr-only">studentId</label>
        <input type="text" name="studentId" id="studentId" v-model="searchId"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Student id .." />
      </div>
      <div class="mt-3 flex">
        <button type="button"
          class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="getStudentInfo" @click="onCheckStudentClicked()">Check Student</button>
        <button type="button"
          class="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="getStudentsInfo" @click="onCheckStudentsClicked()">Check Partial Students id</button>
      </div>
    </div>
  </div>
  <div class="px-4 sm:px-6 lg:px-8" v-if="showOutput">
    <div class="mt-8 flow-root">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Student Id
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Surname</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">GPA</th>

              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="(student, studentIdx) in students" :key="student.studentId"
                :class="studentIdx % 2 === 0 ? undefined : 'bg-gray-50'">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">{{
                  student.studentId }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.surName }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ student.gpa.toFixed(2) }}</td>
              </tr>
            </tbody>
            <tfoot>

              <tr>
                <td scope="row" colspan="2"
                  class="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">
                </td>
                <td scope="row" class="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 ">Total GPA</td>
                <td class="pl-3 pr-4 pt-4 text-sm font-semibold text-gray-900 sm:pr-0"><div id="totalGPA">{{totalGPa.toFixed(2)}}</div></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
