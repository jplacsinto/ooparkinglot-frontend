type Entrypoint = {
    id: number
    name: string
    slots: Array<Slot>
}

type Slot = {
    id: number
    size: number
    distance: number
}

type Parking = {
    id: number
    entrypoint: string
    slot_id: number
    registration_id: string
    date_parked: string
    date_unparked: string
    parking_time: number
    total_fee: number
}

type ParkingFormData = {
    registration_id: string
    entrypoint_id: string
    vehicle_size: number
    slot_id: number
}

type ValidationErrors = {
    errors: Array<Object>
}