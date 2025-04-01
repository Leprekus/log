export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      exercise: {
        Row: {
          deleted: boolean
          exerciseid: string
          name: string
          numberofsets: number
          units: boolean
          userid: string
        }
        Insert: {
          deleted?: boolean
          exerciseid?: string
          name: string
          numberofsets?: number
          units?: boolean
          userid: string
        }
        Update: {
          deleted?: boolean
          exerciseid?: string
          name?: string
          numberofsets?: number
          units?: boolean
          userid?: string
        }
        Relationships: []
      }
      sets: {
        Row: {
          exerciseid: string | null
          exercisename: string | null
          reps: number
          setid: string
          units: boolean
          weight: number
          workoutid: string
        }
        Insert: {
          exerciseid?: string | null
          exercisename?: string | null
          reps?: number
          setid?: string
          units?: boolean
          weight?: number
          workoutid: string
        }
        Update: {
          exerciseid?: string | null
          exercisename?: string | null
          reps?: number
          setid?: string
          units?: boolean
          weight?: number
          workoutid?: string
        }
        Relationships: [
          {
            foreignKeyName: "sets_exerciseid_fkey"
            columns: ["exerciseid"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["exerciseid"]
          },
          {
            foreignKeyName: "sets_exercisename_fkey"
            columns: ["exercisename"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["name"]
          },
          {
            foreignKeyName: "sets_workoutid_fkey"
            columns: ["workoutid"]
            isOneToOne: false
            referencedRelation: "workout"
            referencedColumns: ["workoutid"]
          },
        ]
      }
      template: {
        Row: {
          frequency: number
          name: string
          templateid: string
          userid: string
        }
        Insert: {
          frequency: number
          name: string
          templateid?: string
          userid: string
        }
        Update: {
          frequency?: number
          name?: string
          templateid?: string
          userid?: string
        }
        Relationships: []
      }
      workout: {
        Row: {
          exerciseid: string | null
          templateid: string | null
          userid: string | null
          workoutid: string
        }
        Insert: {
          exerciseid?: string | null
          templateid?: string | null
          userid?: string | null
          workoutid?: string
        }
        Update: {
          exerciseid?: string | null
          templateid?: string | null
          userid?: string | null
          workoutid?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exerciseid_fkey"
            columns: ["exerciseid"]
            isOneToOne: false
            referencedRelation: "exercise"
            referencedColumns: ["exerciseid"]
          },
          {
            foreignKeyName: "workout_templateid_fkey"
            columns: ["templateid"]
            isOneToOne: false
            referencedRelation: "template"
            referencedColumns: ["templateid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_template:
        | {
            Args: {
              input_userid: string
              exercises_r: Database["public"]["CompositeTypes"]["exercise_record"][]
              input_templatename: string
              input_frequency: number
            }
            Returns: undefined
          }
        | {
            Args: {
              input_userid: string
              input_exerciseid: string
              input_exercisename: string
              input_numberofsets: number
              input_units: boolean
              input_deleted: boolean
              input_templatename: string
              input_frequency: number
            }
            Returns: undefined
          }
        | {
            Args: {
              input_userid: string
              input_templatename: string
              input_frequency: number
            }
            Returns: undefined
          }
        | {
            Args: {
              input_userid: string
              record: Database["public"]["Tables"]["exercise"]["Row"][]
              input_templatename: string
              input_frequency: number
            }
            Returns: undefined
          }
      hello_world: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      test:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              pipi: number
            }
            Returns: string
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      exercise_record: {
        exerciseid: string | null
        exercisename: string | null
        numberofsets: number | null
        units: boolean | null
        deleted: boolean | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
