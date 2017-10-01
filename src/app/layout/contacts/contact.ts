export class Contact {

    private _id: number;
    private _phone: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _addressLine1: string;
    private _addressLine2: string;
    private _city: string;
    private _state: string;
    private _country: string;
    private _postalCode: string;
    private _details: string;
    private _type: string;


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get phone(): number {
        return this._phone;
    }

    set phone(value: number) {
        this._phone = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get addressLine1(): string {
        return this._addressLine1;
    }

    set addressLine1(value: string) {
        this._addressLine1 = value;
    }

    get addressLine2(): string {
        return this._addressLine2;
    }

    set addressLine2(value: string) {
        this._addressLine2 = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get postalCode(): string {
        return this._postalCode;
    }

    set postalCode(value: string) {
        this._postalCode = value;
    }

    get details(): string {
        return this._details;
    }

    set details(value: string) {
        this._details = value;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }
}
