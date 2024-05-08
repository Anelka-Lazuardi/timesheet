import { create } from 'zustand'

interface IStateStore {
    loading: boolean
    setLoading: (loading: boolean) => void

    formState: {
        open: boolean
        message: string
        type?: 'success' | 'error'
    }
    setFormState: (open: boolean, message: string, type?: 'success' | 'error') => void


    openDialog: string
    setOpenDialog: (val: string) => void

}

interface IProject {
    id: string;
    name: string;
}

interface IUser {
    id?: string;
    name: string;
    rate: number;
}

export interface IActivity {
    id?: string;
    title: string;
    startDate: string;
    endDate: string;
    duration: number;
    userId: string;
    projectId: string;
}


interface IStateActivityStore {
    user: IUser,
    activities: IActivity[];
    projects: IProject[]
    filterData: {
        filterProject: string[]
        filterTitle: string
    }

    updateStateFilter: (filterData: { filterProject: string[], filterTitle: string }) => void
    updateStateUser: (user: IUser) => void
    updateStateActivities: (activities: IActivity[]) => void
    updateStateProjects: (projects: IProject[]) => void

}

interface IActivityForm extends IActivity {
    startTime: string
    endTime: string
}

interface IstateFormStore {
    activity: IActivityForm
    project: Pick<IProject, 'name'>
    activityDefault: IActivityForm
    projectDefault: Pick<IProject, 'name'>
    updateActivitiy: (activities: IActivityForm) => void
    updateProject: (projects: Pick<IProject, 'name'>) => void

}

export const stateStore = create<IStateStore>()((set) => ({
    loading: false,
    setLoading: (loading: boolean) => set({ loading }),

    formState: {
        open: false,
        message: "",
    },
    setFormState: (open: boolean, message: string, type?: 'success' | 'error') => set({ formState: { open, message, type } }),

    openDialog: "",
    setOpenDialog: (val: string) => set({ openDialog: val }),

}))

export const stateActivityStore = create<IStateActivityStore>()((set) => ({
    user: {
        name: "-",
        rate: 0
    },
    activities: [],
    projects: [],
    filterData: {
        filterProject: [],
        filterTitle: ""
    },
    updateStateFilter: (filterData: { filterProject: string[], filterTitle: string }) => set({ filterData }),
    updateStateUser: (user: IUser) => set({ user }),
    updateStateActivities: (activities: IActivity[]) => set({ activities }),
    updateStateProjects: (projects: IProject[]) => set({ projects }),

}))

// { title: "", startDate: "", endDate: "", startTime: "", endTime: "", projectId: "" }

const defaultValues = {
    activity: {
        title: "",
        startDate: "",
        endDate: "",
        duration: 0,
        userId: "",
        projectId: "",
        startTime: "",
        endTime: "",
    },
    project: {
        name: "",
    },
}

export const stateFormStore = create<IstateFormStore>()((set) => ({
    activity: defaultValues.activity,
    project: defaultValues.project,
    activityDefault: defaultValues.activity,
    projectDefault: defaultValues.project,
    updateActivitiy: (activities: IActivityForm) => set({ activity: activities }),
    updateProject: (projects: Pick<IProject, 'name'>) => set({ project: projects }),

}))