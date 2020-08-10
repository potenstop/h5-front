import { JsonProperty } from 'papio-h5'
/**
 *
 * 功能描述:
 *
 * @className FavoritesAddRequest
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/8/10 11:13
 */
export class FavoritesAddRequest {
  @JsonProperty
  private businessLineId: string
  @JsonProperty
  private clientId: number
  @JsonProperty
  private tableName: string
  public getBusinessLineId (): string {
    return this.businessLineId
  }
  public setBusinessLineId (businessLineId: string): void {
    this.businessLineId = businessLineId
  }
  public getClientId (): number {
    return this.clientId
  }
  public setClientId (clientId: number): void {
    this.clientId = clientId
  }
  public getTableName (): string {
    return this.tableName
  }
  public setTableName (tableName: string): void {
    this.tableName = tableName
  }
}
