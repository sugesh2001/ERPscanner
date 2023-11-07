import { imagelinks } from './imagelinks'

export interface NewDoctypefromOld{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Location : Data	*/
	location?: string
	/**	Time : Data	*/
	time?: string
	/**	Image : Long Text	*/
	image?: string
	/**	carry : Data	*/
	carry?: string
	/**	Date : Data	*/
	date?: string
	/**	ImageList6 : Long Text	*/
	imagelist6?: string
	/**	Laptop Serial : Data	*/
	laptop_serial?: string
	/**	Laptop Brand : Data	*/
	laptop_brand?: string
	/**	Id : Link - Employee	*/
	id?: string
	/**	Return : Data	*/
	checked?: string
	/**	Balance : Data	*/
	unchecked?: string
	/**	status : Data	*/
	status?: string
	/**	imagelinks : Table - imagelinks	*/
	imagelinks?: imagelinks[]
	/**	Employee Doctype : Link - Employee	*/
	employee_doctype?: string
	/**	Attendance Doctype : Link - Attendance	*/
	attendance_doctype?: string
	/**	Laptop Image : Attach Image	*/
	laptop_image?: string
	/**	Laptop Image 1 : Image	*/
	laptop_image_1?: string
}