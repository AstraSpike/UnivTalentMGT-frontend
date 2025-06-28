import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Person {
id: number;
    name: string;
    personnelId: number;
    idCardNumber: string;
    gender: 'male' | 'female';
    age: number;
    position: string;
    title: string;
    department: string;
    entryTime: string;
    education: string;
    degree: string;
    university: string;
    major: string;
    phone: string;
    email: string;
    politicalStatus: string;
    nativePlace: string;
    maritalStatus: string;
    ethnicity: string;
    tags: {
        id: number;
        tagName: string;
        tagType: string;
        createTime: string;
        updateTime: string;
    }[];
    prochance?: number;
    detailInfo?: any;
}

export const usePersonInfoStore = defineStore('personInfo', () => {
    const basicInfo = ref<Record<string, any>>({})
    const personId = ref<number>(0)

    const setPersonInfo = (person: Person) => {
        if (typeof person === 'number') {
            personId.value = person
            basicInfo.value = {}
        } else {
            personId.value = person.id
            basicInfo.value = {
                name: person.name,
                gender: person.gender === 'male' ? '男' : '女',
                age: person.age,
                department: person.department,
                position: person.position,
                title: person.title,
                entryTime: person.entryTime,
                university: person.university,
                major: person.major,
                phone: person.phone,
                email: person.email,
                politicalStatus: person.politicalStatus,
                education: person.education,
                nativePlace: person.nativePlace,
                maritalStatus: person.maritalStatus,
                ethnicity: person.ethnicity
            }
        }
    }

    return {
        basicInfo,
        personId,
        setPersonInfo
    }
})