export interface confiscated{
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
	/**	carry : Data	*/
	carry?: string
	/**	ImageList6 : Long Text	*/
	imagelist6?: string
	/**	Image : Attach Image	*/
	image?: string
	/**	Date : Data	*/
	date?: string
	/**	Location : Data	*/
	location?: string
}