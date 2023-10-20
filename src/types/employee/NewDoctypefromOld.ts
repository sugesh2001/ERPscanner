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
	/**	Image : Attach Image	*/
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
	/**	Id : Data	*/
	id?: string
	/**	Return : Data	*/
	checked?: string
	/**	Balance : Data	*/
	unchecked?: string
	/**	status : Data	*/
	status?: string
}